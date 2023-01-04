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
  userProfilesSelector,
  userSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
import Progress from "./Progress";
import SideBarOfDraw from "./layout/SideBar/SideBarOfDraw";
import Solver from "./Solver";
import useQuestionUpdate from "@hooks/gameHooks/updateState/useQuestionUpdate";
import AnswerModal from "./Modal/AnswerModal";
import { CPGameDrawee } from "@types";
import useSolver from "@hooks/gameHooks/DRAWEE/useSolver";

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
      <Button>삭제 버튼</Button>
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
      const newGameState = {
        gamePagesIndex: gamePagesIndex + 1,
      };
      if (gamePagesIndex + 1 >= questionsState.length) {
        newGameState["path"] = "/lobby";
      }
      changeGameStateHandler(newGameState);
    }
  }, [changeGameStateHandler, isOwner, questionsState.length, roomId]);
  const { getSolverId } = useSolver();

  const questionTimeOut = () => {
    if (getSolverId() === doc.clientID) {
      doc.transact(() => {
        const gamePagesIndex = gameState.gamePagesIndex;
        const question = yQuestionsState.get(gamePagesIndex);

        if (question === undefined) return;
        const newQuestion = {
          ...question,
          isQuestionEnd: true,
        };
        yQuestionsState.delete(gamePagesIndex);
        yQuestionsState.insert(gamePagesIndex, [newQuestion]);
      });
    }
  };

  const [isPlay, setIsPlay] = useState<"running" | "paused">("running");

  return (
    <>
      <Progress
        play={isPlay}
        time={60000}
        callback={() => {
          setIsPlay("paused");
          questionTimeOut();
        }}
      ></Progress>

      {gameState &&
        questionsState.length > gameState.gamePagesIndex &&
        questionsState[gameState.gamePagesIndex].isQuestionEnd && (
          <AnswerModal
            setIsPlay={setIsPlay}
            onClose={() => {
              setIsPlay("running");
              nextPageHandler();
            }}
          />
        )}

      <div>{gameState?.gamePagesIndex} 번째 문제</div>
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
