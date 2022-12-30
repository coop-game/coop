import { useMultiplayerState } from "./../hooks/useMultiplayerState";

import { css } from "@emotion/react";

import NewCursor, { CursorComponent } from "@components/NewCursor";

// import { yjsState } from "@common/recoil/recoil.atom";

import * as Y from "yjs";

import { Tldraw } from "@coop/draw";
import {
  doc,
  getChangeGameStateHandler,
  providerState,
  yGameState,
} from "@common/yjsStore/userStore";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import { useRecoilValue } from "recoil";
import {
  userProfilesSelector,
  userSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import Timer from "./Timer/Timer";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import { useCallback, useEffect, useState } from "react";
import { Button, Progress } from "@chakra-ui/react";
import useTimer from "@hooks/useTimer";
import CircleTimer from "./Timer/CircleTimer";

function Editor({}) {
  const userState = useRecoilValue(userSelector);
  const { onMount, onChangePage, onUndo, onRedo, onChangePresence } =
    useMultiplayerState({
      provider: providerState?.provider,
      room: providerState?.room,
      customUserId: userState?.nickname,
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
  const gameState = useRecoilValue(yjsGameState);
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const changeGameStateHandler = getChangeGameStateHandler(roomId);
  const questionState = useRecoilValue(yjsQuestionsState);

  useProfileUpdate();
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();

  const callbackHandler = useCallback(() => {
    if (isOwner === true) {
      console.log("isOwner true");
      // console.log("gameState.gamePagesIndex", gameState.gamePagesIndex + 1);
      const gamePagesIndex = yGameState.get(roomId).gamePagesIndex;
      console.log(gamePagesIndex);
      const temp = {
        gamePagesIndex: gamePagesIndex + 1,
      };
      if (gamePagesIndex + 1 >= questionState.length) {
        temp["path"] = "/lobby";
      }
      changeGameStateHandler(temp);
    }
  }, [changeGameStateHandler, isOwner, questionState.length, roomId]);

  useEffect(() => {
    const gamePagesIndex = yGameState.get(roomId).gamePagesIndex;
    if (gamePagesIndex >= questionState.length) {
      changeGameStateHandler({ path: "/lobby" });
    }
  }, []);

  const [isStop, setisStop] = useState(false);

  return (
    <>
      {/* <Timer
        time={5000}
        gaugeColor={["red", "orange", "green"]}
        callback={callbackHandler}
      /> */}
      <CircleTimer
        time={5000}
        gaugeColor={["red", "orange", "green"]}
        callback={callbackHandler}
      />
      {questionState.map((v, idx) => {
        return (
          <div key={idx}>
            <div>{v.question}</div>
            <div>{v.questioner}</div>
            <div>{v.answer}</div>
          </div>
        );
      })}
      <Button onClick={callbackHandler}></Button>
      <div>-------------------------------</div>
      <div>{providerState?.provider.roomName}</div>
      <div>gamePagesIndex : {gameState.gamePagesIndex}</div>
      {providerState.provider !== null && (
        <div className="tldraw">
          <Editor />
        </div>
      )}
    </>
  );
}
export default Draw;
