import { atom, selector } from 'recoil';
import { nanoid } from 'nanoid'

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

export const roomState = atom<draweeType | null>({
  key: 'ROOM_STATE',
  default: null
});

export const roomIdSelector = selector({
  key: 'draweeRoomIdSelector',
  get: async ({ get }) => {
    return get(roomState)
  },
  set: ({ set },newValue) => set(roomState,newValue)),
    // {
    // roomId:nanoid(),
    // share:null,
    // {
    //   lobby:true,
    //   problemIndex:0,
    //   problemList:[],
    // }

});
 


