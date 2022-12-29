import { CPGameQuestion } from "./../../../types/index.d";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";
import { Room } from "@y-presence/client";
import { CPGameState, CPUserProfile } from "@types";

export const doc = new Y.Doc();

export const yGameState = doc.getMap<CPGameState>("gameState");

export const yUserProfilesState = doc.getMap<CPUserProfile>("userProfiles");

export const yAgreeState = doc.getMap<boolean>("agreeMap");

export const yQuestionsState = doc.getArray<CPGameQuestion>("questions");

export const getChangeGameStateHandler = (roomId: string) => {
  return (partialGameState = {} as Partial<CPGameState>) => {
    const gameState = yGameState.get(roomId);
    const newGameState = { ...gameState, ...partialGameState };
    yGameState.set(roomId, newGameState);
  };
};

export class providerClass {
  provider: WebrtcProvider | null;
  room: Room | null;

  constructor() {
    this.provider = null;
    this.room = null;
  }

  clearProvider = () => {
    console.log("clearProvider");
    this.provider.destroy();
    this.provider = null;
    this.room.destroy();
    this.room = null;
  };

  createProvider = (roomId: string, isCreater: boolean) => {
    if (this.provider === null) {
      console.log("creactProvider");
      this.provider = new WebrtcProvider(roomId, doc, {
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
      console.log(this.provider);
    }
    if (this.room === null) {
      this.room = new Room(this.provider.awareness);
      if (isCreater) {
        const gameState: CPGameState = {
          path: "/lobby",
          isGameStart: false,
          gamePagesIndex: -1,
        };
        yGameState.set(roomId, gameState);
      }
    }
  };
}

export const providerState = new providerClass();
