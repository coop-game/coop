import { useMultiplayerState } from "./../hooks/useMultiplayerState";

import { css } from "@emotion/react";

import NewCursor, { CursorComponent } from "@components/NewCursor";

import { Tldraw } from "@coop/draw";
import {
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
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import Progress from "./Progress";
import SideBarOfDraw from "./layout/SideBar/SideBarOfDraw";
import Solver from "./Solver";
import useQuestionUpdate from "@hooks/gameHooks/updateState/useQuestionUpdate";
import AnswerModal from "./Modal/AnswerModal";

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
        width: 100%;
        height: 100%;
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
  useQuestionUpdate();
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();
  useEffect(() => {
    console.log(gameState.path, "가 바뀜");
  }, [gameState.path]);

  const nextPageHandler = useCallback(() => {
    console.log(userProfiles);
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

  // useEffect(() => {
  //   const gamePagesIndex = yGameState.get(roomId).gamePagesIndex;
  //   if (gamePagesIndex >= questionState.length) {
  //     changeGameStateHandler({ path: "/lobby" });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [isPlay, setIsPlay] = useState("running");

  const isAnswerInArray = () => {
    if (questionState.length > gameState.gamePagesIndex) {
      const question = questionState[gameState.gamePagesIndex];
      return question.inputAnswer.includes(question.answer);
    }
  };

  return (
    <>
      <Progress
        play={isPlay}
        time={50000}
        callback={() => {
          nextPageHandler();
        }}
      ></Progress>
      {isAnswerInArray() && <AnswerModal onClose={() => {}}></AnswerModal>}
      <Button onClick={nextPageHandler}></Button>
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
      <div
        css={css`
          display: flex;
          width: 100%;
          heigth: 100%;
        `}
      >
        {providerState.provider !== null && (
          <div
            className="tldraw"
            css={css`
              flex-flow: 1;
              width: 100%;
              height: 100%;
            `}
          >
            <Editor />
          </div>
        )}
        <div
          css={css`
            flex-basis: 200px;
          `}
        >
          <SideBarOfDraw></SideBarOfDraw>
        </div>
      </div>
      <Solver></Solver>
    </>
  );
}
export default Draw;
