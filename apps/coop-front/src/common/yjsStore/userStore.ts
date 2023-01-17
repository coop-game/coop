import getUtcTimeStamp from "@common/lib/getUtcTimeStamp";
import {
  CPChatType,
  CPGameQuestion,
  CPGameRelayRaceAnswer,
} from "./../../../types/index.d";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";
import { Room } from "@y-presence/client";
import { CPGameState, CPUserProfile } from "@types";

export const doc = (() => {
  const doc = new Y.Doc();
  if (typeof window !== "undefined") {
    const CLIENT_ID = "clientID";
    const localStorageClientID = localStorage.getItem(CLIENT_ID);
    if (localStorageClientID) {
      doc.clientID = Number(localStorageClientID);
    } else {
      localStorage.setItem(CLIENT_ID, String(doc.clientID));
    }
  }
  return doc;
})();

export const yGameState = doc.getMap<CPGameState>("gameState");

export const yUserProfilesState = doc.getMap<CPUserProfile>("userProfiles");

export const yAgreeState = doc.getMap<boolean>("agreeMap");

export const yQuestionsState = doc.getArray<CPGameQuestion>("questions");

export const yRelayRaceAnswerState =
  doc.getArray<CPGameRelayRaceAnswer>("relayRaceAnswer");
export const yChattingState = doc.getArray<CPChatType>("chatting");

export const yGameUserProfileStates =
  doc.getArray<CPUserProfile>("gameUserProfiles");

export const getChangeGameStateHandler = <T>(roomId: string) => {
  return (partialGameState = {} as Partial<T>) => {
    const gameState = yGameState.get(roomId);
    const newGameState = { ...gameState, ...partialGameState };
    if (partialGameState.hasOwnProperty("gamePagesIndex")) {
      newGameState["pageStartTime"] = getUtcTimeStamp();
    }
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
    this.provider.destroy();
    this.provider = null;
    this.room.destroy();
    this.room = null;
  };

  disconnectProvider = () => {
    this.provider.disconnect();
  };

  connectProvider = () => {
    this.provider.connect();
  };

  createProvider = (roomId: string) => {
    if (this.provider === null) {
      this.provider = new WebrtcProvider(roomId, doc, {
        signaling: [`ws://${process.env.NEXT_PUBLIC_BACKEND_URL}`],
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
    }
    if (this.room === null) {
      this.room = new Room(this.provider.awareness);
    }
  };
}

export const providerState = new providerClass();
