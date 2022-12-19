import { atom, selector } from "recoil";
import { nanoid } from "nanoid";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";
import { Room } from "@y-presence/client";
import {
  CPChatType,
  CPPage,
  CPPages,
  CPUserProfile,
  CPUserProfilesState,
  CPUserType,
} from "@types";

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

// export const yRoomOwner = doc.getMap("roomOwner");

export const yRoomUsers = doc.getArray<number>("roomUsers");
export const yPages = doc.getArray<CPPage>("pages");

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
      yRoomUsers.push([doc.clientID]);
      console.log(
        "this.provider.awareness.getStates()",
        this.provider.awareness.getStates().size
      );
      if (isCreater) {
        yPages.push([{ path: "/lobby" }]);
      }
    }
  };
}

export const providerState = new providerClass();

export const userState = atom<CPUserType | null>({
  key: "USER_STATE",
  default: null,
});

export const userSelector = selector({
  key: "USER_SELECTOR",
  get: ({ get }) => {
    return get(userState);
  },
  set: ({ set }, newValue) => set(userState, { ...newValue }),
});

export const userProfilesState = atom<CPUserProfilesState>({
  key: "USER_PROFILES_STATE",
  default: {
    isOwner: false,
    userProfiles: [],
  },
});

export const userProfilesSelector = selector({
  key: "USER_PROFILES_SELECTOR",
  get: ({ get }) => {
    return get(userProfilesState);
  },
  set: ({ set }, newValue) =>
    set(userProfilesState, (prev) => ({ ...prev, ...newValue })),
});

export const ChattingState = atom<CPChatType[]>({
  key: "CHATTING_STATE",
  default: [],
});

export const ChattingSelector = selector({
  key: "CHATTING_SELECTOR",
  get: ({ get }) => {
    return get(ChattingState);
  },
  set: ({ set }, newValue: CPChatType[]) => {
    set(ChattingState, newValue);
  },
});
