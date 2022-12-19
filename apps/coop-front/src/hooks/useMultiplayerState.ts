import { TDBinding, TDShape, TDUser, TldrawApp } from "@coop/draw";
import { useCallback, useEffect, useMemo, useState } from "react";

import * as Y from "yjs";
import { doc, providerClass, yjsStateType } from "@common/recoil/recoil.atom";
import { Room } from "@y-presence/client";
import { useRecoilState } from "recoil";
import { WebrtcProvider } from "y-webrtc";

export function useMultiplayerState({
  provider,
  room,
  customUserId,
}: {
  provider: WebrtcProvider;
  room: Room;
  customUserId: string;
}) {
  const yShapes: Y.Map<TDShape> = doc.getMap("shapes");
  const yBindings: Y.Map<TDBinding> = doc.getMap("bindings");

  const undoManager = useMemo(
    () => new Y.UndoManager([yShapes, yBindings]),
    [yShapes, yBindings]
  );

  const [app, setApp] = useState<TldrawApp>();
  const [loading, setLoading] = useState(true);

  const onMount = useCallback(
    (app: TldrawApp) => {
      console.log("룸이 바뀜");
      app.loadRoom(provider.roomName);
      app.pause();
      setApp(app);
    },
    [provider.roomName]
  );

  // draw 좌표 전송 부분
  const onChangePage = useCallback(
    (
      app: TldrawApp,
      shapes: Record<string, TDShape | undefined>,
      bindings: Record<string, TDBinding | undefined>
    ) => {
      undoManager.stopCapturing();
      console.log("shapes bindings", shapes, bindings);
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
    [undoManager, yBindings, yShapes]
  );

  // 뒤로가기 앞으로가기
  const onUndo = useCallback(() => {
    undoManager.undo();
  }, [undoManager]);

  const onRedo = useCallback(() => {
    undoManager.redo();
  }, [undoManager]);

  // 이부분이 수상?
  const onChangePresence = useCallback(
    (app: TldrawApp, user: TDUser) => {
      if (!app.room) return;
      console.log("user", user);
      console.log("provider", provider);
      user.id += `|${customUserId}`;
      room.setPresence({ id: app.room.userId, tdUser: user });
    },
    [customUserId, room]
  );

  /**
   * Update app users whenever there is a change in the room users
   */
  // 룸 유저가 바뀌면 갱신한다는건데 이부분이 좀 모르겠네 더
  useEffect(() => {
    if (!app || !room) return;

    const unsubOthers = room.subscribe("others", (users: any[]) => {
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
    });

    return () => {
      unsubOthers();
    };
  }, [app, room]);

  // 연결을 끊는 부분?
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
  }, [app, provider, room, yBindings, yShapes]);

  // useEffect(() => {
  //   console.log("provider.roomName : ", provider.roomName, app, room);
  // }, [provider, app, room]);

  return {
    onMount,
    onChangePage,
    onUndo,
    onRedo,
    loading,
    onChangePresence,
  };
}
