import { atom, selector } from "recoil";
import { nanoid } from "nanoid";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";
import { Room } from "@y-presence/client";

export interface ProblemType {
  player: string;
  answer: string;
  drawList: Array<any>;
}

export interface draweeShareType {
  lobby: boolean;
  problemIndex: number; // y.doc text
  problemList: Array<ProblemType>;
}

export interface draweeType {
  roomId: string;
  share: draweeShareType | null;
}

export interface yjsStateType {
  roomId: string;
  room?: Room;
  provider?: WebrtcProvider;
}

export const doc = new Y.Doc();

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

  createProvider = (roomId: string) => {
    console.log("creactProvider");
    if (this.provider === null) {
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
    }
  };
}

export const providerState = new providerClass();

export const userState = atom<{ roomId: string; nickname: string } | null>({
  key: "USER_STATE",
  default: null,
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    return get(userState);
  },
  set: ({ set }, newValue) => set(userState, { ...newValue }),
});
