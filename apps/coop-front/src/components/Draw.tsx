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
import { Button } from "@chakra-ui/react";
import useTimer from "@hooks/useTimer";
import CircleTimer from "./Timer/CircleTimer";
import Progress from "./Progress";
import SideBarOfDraw from "./layout/SideBar/SideBarOfDraw";
import Solver from "./Solver";

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
        components={{ Cursor: NewCursor as CursorComponent }}
      />
      <SideBarOfDraw></SideBarOfDraw>
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
      const gamePagesIndex = yGameState.get(roomId).gamePagesIndex;
      console.log(gamePagesIndex);
      const newGameState = {
        gamePagesIndex: gamePagesIndex + 1,
      };
      // if (gamePagesIndex + 1 >= questionState.length) {
      //   newGameState["path"] = "/lobby";
      // }
      changeGameStateHandler(newGameState);
    }
  }, [changeGameStateHandler, isOwner, questionState.length, roomId]);

  useEffect(() => {
    const gamePagesIndex = yGameState.get(roomId).gamePagesIndex;
    if (gamePagesIndex >= questionState.length) {
      changeGameStateHandler({ path: "/lobby" });
    }
  }, []);

  const [isStop, setIsStop] = useState(false);
  const [isPlay, setIsPlay] = useState("running");

  return (
    <>
      <div>
        <div>asdf</div>
      </div>
      <Progress play={isPlay} time={5000} callback={callbackHandler}></Progress>
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
      <Button onClick={() => setIsStop((prev) => !prev)}>isStop</Button>
      <Button
        onClick={() =>
          setIsPlay((prev) => (prev === "running" ? "paused" : "running"))
        }
      >
        setIsPlay
      </Button>
      <div>-------------------------------</div>
      <div>{providerState?.provider.roomName}</div>
      <div>gamePagesIndex : {gameState.gamePagesIndex}</div>
      {providerState.provider !== null && (
        <div className="tldraw">
          <Editor />
        </div>
      )}
      <Solver></Solver>
    </>
  );
}
export default Draw;
