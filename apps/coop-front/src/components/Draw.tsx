import { useFileSystem } from "@coop/draw";
import dynamic from "next/dynamic";
import  { useMultiplayerState}  from "./../hooks/useMultiplayerState";
import React, { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";

import { RoomProvider, useOthers, useUpdatePresence } from "@y-presence/react";
import { UserPresence } from "./../../types/global";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";

import NewCursor, {CursorComponent} from "@components/NewCursor"

// import { yjsState } from "@common/recoil/recoil.atom";

import * as Y from "yjs";
import { yjsStateType } from "@common/recoil/recoil.atom";

const Tldraw = dynamic(() => import("@coop/draw").then((mod) => mod.Tldraw), {
  ssr: false,
});

function Editor({ roomId,yjsValue }: { roomId: string,yjsValue:yjsStateType }) {

  const { 
    onMount,
    onChangePage,
    onUndo,
    onRedo,
    onChangePresence
   } = useMultiplayerState({...yjsValue,customUserId:"하이루"});


  return (
    <>
      <Tldraw
        showMenu={false}
        // autofocus
        // disableAssets
        showPages={false}
        onMount={onMount}
        onChangePage={onChangePage}
        onUndo={onUndo}
        onRedo={onRedo}
        onChangePresence={onChangePresence}
        components={
          {Cursor:NewCursor as CursorComponent}
        }
        />
      </>
  );
}

function Draw() {
  // const yjsValue = useRecoilValue(yjsState);
  const [yjsValue,setYjsValue] = useState< yjsStateType| null>(null)

  useEffect(()=>{
    // console.log(window.location)
    const roomId  = window.location.search;
    const doc = new Y.Doc();
    const provider = new WebrtcProvider(roomId, doc, {
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
  })
  setYjsValue({
    roomId,
    doc,
    provider,
  })
  },[window.location.search])

  if(yjsValue === null){
    return <div>loading...</div>
  }

  const onSubmitHandler =(e:React.FormEvent<HTMLFormElement>) =>{
    console.log(e)
  }

  return (
    <>
    <form onSubmit={onSubmitHandler}>
      <input type="text" title="roomid" name="roomId"/>
    </form>
    <div>?????</div>
    <div>{yjsValue?.roomId}</div>
    <div className="tldraw">
      <Editor yjsValue={yjsValue} roomId={yjsValue.roomId} />
    </div>
    </>
  );
}

export default Draw;