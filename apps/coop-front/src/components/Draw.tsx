import dynamic from "next/dynamic";
import { useMultiplayerState } from "./../hooks/useMultiplayerState";
import React, { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";

import { RoomProvider, useOthers, useUpdatePresence } from "@y-presence/react";
import { UserPresence } from "./../../types/global";
import { css } from "@emotion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import * as math from "lib0/math";
import * as random from "lib0/random";

import NewCursor, { CursorComponent } from "@components/NewCursor";

// import { yjsState } from "@common/recoil/recoil.atom";

import * as Y from "yjs";
import { doc, providerState } from "@common/recoil/recoil.atom";

import { Tldraw } from "@coop/draw";
import { Room } from "@y-presence/client";
import { Button, ButtonGroup } from "@chakra-ui/react";

// const Tldraw = dynamic(() => import("@coop/draw").then((mod) => mod.Tldraw), {
//   ssr: false,
// });

function Editor({
  roomId,
}: {
  roomId: string;
  // yjsValue: yjsStateType;
}) {
  const { onMount, onChangePage, onUndo, onRedo, onChangePresence } =
    useMultiplayerState({
      roomId,
      provider: providerState?.provider,
      room: providerState?.room,
      customUserId: "하이루",
    });

  return (
    <div
      css={css`
        position: relative;
        width: 80vw;
        height: 80vh;
      `}
    >
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
        components={{ Cursor: NewCursor as any }}
      />
    </div>
  );
}

function Draw() {
  // const [yjsValue, setYjsValue] = useRecoilState(yjsState);
  // const [yjsValue, setYjsValue] = useState<yjsStateType | null>(null);

  // const [roomId, setRoomId] = useState("asdf");
  const [inputState, setInputState] = useState("");
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    // const roomId = window.location.search;
    // providerState.createProvider(roomId);
    // setRoomId(roomId);
    // return () => {
    //   providerState.clearProvider();
    // };
  }, []);

  return (
    <>
      <input
        type="text"
        name={"roomId"}
        value={inputState}
        onChange={(e) => {
          setInputState(e.target.value);
        }}
      />

      <Button
        onClick={() => {
          if (!!providerState.provider) {
            providerState.clearProvider();
          }
          providerState.createProvider(inputState);
          setRoomId(inputState);
          setInputState("");
        }}
      >
        Button
      </Button>
      <div>{roomId}</div>
      {!(providerState.provider === null || roomId === null) && (
        <div className="tldraw">
          <Editor roomId={roomId} />
        </div>
      )}
    </>
  );
}

export default Draw;
