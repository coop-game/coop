import { useMultiplayerState } from "./../hooks/useMultiplayerState";

import { css } from "@emotion/react";

import NewCursor, { CursorComponent } from "@components/NewCursor";

import { Tldraw, TldrawApp } from "@coop/draw";
import {
  doc,
  getChangeGameStateHandler,
  providerState,
  yGameState,
  yQuestionsState,
} from "@common/yjsStore/userStore";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import { useRecoilValue } from "recoil";
import {
  transitionPageAnimationState,
  userProfilesSelector,
  userSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, useColorMode, useTheme } from "@chakra-ui/react";
import Progress from "./Progress";
import SideBarOfDraw from "./layout/SideBar/SideBarOfDraw";
import Solver from "./Solver";
import useQuestionUpdate from "@hooks/gameHooks/updateState/useQuestionUpdate";
import AnswerModal from "./Modal/AnswerModal";
import { CPGameDrawee } from "@types";
import useSolver from "@hooks/gameHooks/DRAWEE/useSolver";
import CanvasViewer from "./CanvasViewer";
import CurrentQuestionNumber from "./CurrentQuestionNumber";

function Editor({}) {
  const userState = useRecoilValue(userSelector);
  const gameState = useRecoilValue(yjsGameState);
  const { onMount, onChangePage, onUndo, onRedo, onChangePresence } =
    useMultiplayerState({
      color: userState?.color,
      provider: providerState?.provider,
      room: providerState?.room,
      customUserId: userState?.nickname,
      pageIndex: gameState?.gamePagesIndex,
    });

  const isAnimationEnd = useRecoilValue(transitionPageAnimationState);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      {isAnimationEnd && (
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
          darkMode={colorMode !== "light"}
          // disableAssets={true}
          components={{
            Cursor: NewCursor as CursorComponent,
            CurrentQuestionNumber: <SideBarOfDraw></SideBarOfDraw>,
          }}
        />
      )}
    </div>
  );
}

function Draw() {
  const gameState = useRecoilValue(yjsGameState);
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const changeGameStateHandler =
    getChangeGameStateHandler<CPGameDrawee>(roomId);
  const questionsState = useRecoilValue(yjsQuestionsState);

  useProfileUpdate();
  useQuestionUpdate();
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();

  const nextPageHandler = useCallback(() => {
    if (isOwner === true) {
      const gamePagesIndex = yGameState.get(roomId).gamePagesIndex;
      const newGameState = {};
      if (gamePagesIndex + 1 >= questionsState.length) {
        newGameState["path"] = "/result";
      } else {
        newGameState["gamePagesIndex"] = gamePagesIndex + 1;
      }
      changeGameStateHandler(newGameState);
    }
  }, [changeGameStateHandler, isOwner, questionsState.length, roomId]);
  const { getSolverId } = useSolver();

  const setQuestionEnd = useCallback(() => {
    const gamePagesIndex = yGameState.get(roomId).gamePagesIndex;
    doc.transact(() => {
      const question = yQuestionsState.get(gamePagesIndex);

      if (question === undefined) return;
      const newQuestion = {
        ...question,
        isQuestionEnd: true,
      };
      yQuestionsState.delete(gamePagesIndex);
      yQuestionsState.insert(gamePagesIndex, [newQuestion]);
    });
  }, [roomId]);

  const questionTimeOut = useCallback(() => {
    if (
      getSolverId() === providerState?.provider?.awareness.clientID &&
      roomId !== undefined
    ) {
      setQuestionEnd();
    }
  }, [getSolverId, roomId, setQuestionEnd]);

  useEffect(() => {
    const isSolverInUserProfiles = () => {
      return userProfiles.filter((v) => v.id === getSolverId()).length > 0;
    };
    if (isOwner && !isSolverInUserProfiles()) {
      setQuestionEnd();
    }
  }, [getSolverId, isOwner, setQuestionEnd, userProfiles]);

  const [isPlay, setIsPlay] = useState<"running" | "paused">("running");

  return (
    <>
      <Progress
        play={isPlay}
        startTime={gameState?.pageStartTime}
        time={20000000}
        callback={() => {
          setIsPlay("paused");
          questionTimeOut();
        }}
      ></Progress>

      {gameState &&
        questionsState.length >= gameState.gamePagesIndex &&
        questionsState[gameState.gamePagesIndex]?.isQuestionEnd && (
          <AnswerModal
            setIsPlay={setIsPlay}
            onClose={() => {
              setIsPlay("running");
              nextPageHandler();
            }}
          />
        )}

      <div
        css={css`
          display: flex;
          width: 100%;
          heigth: 100%;
        `}
      >
        {providerState.provider !== null && (
          <Box w="100%" h="100%">
            <Editor />
          </Box>
        )}
      </div>
      <Solver></Solver>
    </>
  );
}
export default Draw;
