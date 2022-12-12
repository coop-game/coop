import { atom, selector } from 'recoil';
import { nanoid } from 'nanoid'

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";

export interface ProblemType {
  player:string;
  answer:string;
  drawList:Array<any>
}

export interface draweeShareType { 
  lobby:boolean,
  problemIndex:number, // y.doc text
  problemList:Array<ProblemType>
 };

 export interface draweeType{
  roomId:string,
  share:draweeShareType | null
 }


export interface yjsStateType {
  roomId:string,
  doc:Y.Doc,
  provider:WebrtcProvider,
}

const roomId  = nanoid();
const doc = new Y.Doc();
// const provider = new WebrtcProvider(roomId, doc, {
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
// })



// export const yjsState = atom<yjsStateType | null>({
//   key: 'ROOM_STATE',
//   default: null
// });


// export const yjsSelector = selector({
//   key: 'YjsSelector',
//   get: async ({ get }) => {
//     return get(yjsState)
//   },
//   set: ({set}, newValue) => set(yjsState, newValue === null ? {
//     doc,
//     provider : new WebrtcProvider(roomId, doc, {
//       signaling: ["ws://krkorea.iptime.org:3012"],
//       password: null,
//       awareness: new awarenessProtocol.Awareness(doc),
//       maxConns: 20 + math.floor(random.rand() * 15),
//       filterBcConns: true,
//       peerOpts: {
//         config: {
//           iceServers: [
//             {
//               urls: ["turn:turn.my-first-programming.kr"],
//               username: "test",
//               credential: "test1234",
//             },
//           ],
//         },
//       },
//     })
//   } : newValue),
// });



