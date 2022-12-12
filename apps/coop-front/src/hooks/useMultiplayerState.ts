import { TDBinding, TDShape, TDUser, TldrawApp } from "@coop/draw";
import { useCallback, useEffect, useState } from "react";
import { Room } from "@y-presence/client";
// import type { TldrawPresence } from "./../../types/global";


import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";
interface TldrawPresence  {
  id: string;
  tdUser?: TDUser;
}


export const doc = new Y.Doc();

export const roomID = `y-tldraw-1`;

export const provider = new WebrtcProvider(roomID, doc, {
  signaling: ["ws://krkorea.iptime.org:3012"],
  password: null,
  awareness: new awarenessProtocol.Awareness(doc),
  maxConns: 20 + math.floor(random.rand() * 15),
  filterBcConns: true,
  peerOpts: {
    config: {
      iceServers: [
        {
          urls: ["turn:turn.my-first-programming.kr"],
          username: "test",
          credential: "test1234",
        },
      ],
    },
  },
});




console.log("provider",provider)
// Export the provider's awareness API
export const awareness = provider.awareness;
console.log(awareness);

export const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
export const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");

// Create an undo manager for the shapes and binding maps
export const undoManager = new Y.UndoManager([yShapes, yBindings]);

export function useYjs(roomId:string){
  // const provider = new WebrtcProvider(roomID, doc, {
  //   signaling: ["ws://krkorea.iptime.org:3012"],
  //   password: null,
  //   awareness: new awarenessProtocol.Awareness(doc),
  //   maxConns: 20 + math.floor(random.rand() * 15),
  //   filterBcConns: true,
  //   peerOpts: {
  //     config: {
  //       iceServers: [
  //         {
  //           urls: ["turn:turn.my-first-programming.kr"],
  //           username: "test",
  //           credential: "test1234",
  //         },
  //       ],
  //     },
  //   },
  // });
  // console.log("provider",provider)
  // Export the provider's awareness API
  // const room = new Room<TldrawPresence>(awareness,{id:"test"});
  // return {provider,awareness,room,roomId}
  return {provider,roomId}
}


interface useMultiplayerStateType {
  // provider:WebrtcProvider,
  // awareness:awarenessProtocol.Awareness,
  // room:Room<TldrawPresence>,
  roomId:string
}
// export function useMultiplayerState({ provider,awareness,room,roomId }: useMultiplayerStateType) {
export function useMultiplayerState({roomId}:useMultiplayerStateType) {

  const room = new Room(awareness);

  const [app, setApp] = useState<TldrawApp>();
  const [loading, setLoading] = useState(true);

  const onMount = useCallback(
    (app: TldrawApp) => {
      console.log("app",app)
      app.loadRoom(roomId);
      app.pause();
      setApp(app);
    },
    [roomId]
  );

  const onChangePage = useCallback(
    (
      app: TldrawApp,
      shapes: Record<string, TDShape | undefined>,
      bindings: Record<string, TDBinding | undefined>
    ) => {
      undoManager.stopCapturing();
      doc.transact(() => {
        Object.entries(shapes).forEach(([id, shape]) => {
          if (!shape) {
            yShapes.delete(id);
          } else {
            yShapes.set(shape.id, shape);
          }
        });
        Object.entries(bindings).forEach(([id, binding]) => {
          if (!binding) {
            yBindings.delete(id);
          } else {
            yBindings.set(binding.id, binding);
          }
        });
      });
    },
    []
  );

  const onUndo = useCallback(() => {
    undoManager.undo();
  }, []);

  const onRedo = useCallback(() => {
    undoManager.redo();
  }, []);

  /**
   * Callback to update user's (self) presence
   */
  const onChangePresence = useCallback((app: TldrawApp, user: TDUser) => {
    if (!app.room) return;
    room.setPresence({ id: app.room.userId, tdUser: user });
  }, []);

  /**
   * Update app users whenever there is a change in the room users
   */
  useEffect(() => {
    if (!app || !room) return;

    const unsubOthers = room.subscribe(
      "others",
      (users: any[]) => {
        if (!app.room) return;

        const ids = users
          .filter((user: { presence: any }) => user.presence)
          .map((user: { presence: any }) => user.presence!.tdUser.id);

        Object.values(app.room.users).forEach((user) => {
          if (user && !ids.includes(user.id) && user.id !== app.room?.userId) {
            app.removeUser(user.id);
          }
        });

        app.updateUsers(
          users
            .filter((user) => user.presence)
            .map((other) => other.presence!.tdUser)
            .filter(Boolean)
        );
      }
    );

    return () => {
      unsubOthers();
    };
  }, [app]);

  useEffect(() => {
    if (!app) return;

    function handleDisconnect() {
      provider.disconnect();
    }

    window.addEventListener("beforeunload", handleDisconnect);

    function handleChanges() {
      app?.replacePageContent(
        Object.fromEntries(yShapes.entries()),
        Object.fromEntries(yBindings.entries()),
        {}
      );
    }

    async function setup() {
      yShapes.observeDeep(handleChanges);
      handleChanges();
      setLoading(false);
    }

    setup();

    return () => {
      window.removeEventListener("beforeunload", handleDisconnect);
      yShapes.unobserveDeep(handleChanges);
    };
  }, [app]);

  return {
    onMount,
    onChangePage,
    onUndo,
    onRedo,
    loading,
    onChangePresence,
  };
}
