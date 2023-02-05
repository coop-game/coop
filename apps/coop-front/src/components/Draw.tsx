import { css } from "@emotion/react";

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
import { useCallback, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Progress from "./Progress";
import Solver from "./Solver";
import useQuestionUpdate from "@hooks/gameHooks/updateState/useQuestionUpdate";
import AnswerModal from "./Modal/AnswerModal";
import { CPGameDrawee } from "@types";
import useSolver from "@hooks/gameHooks/DRAWEE/useSolver";
import DrawEditor from "./DrawEditor";
import CanvasViewer from "./Tldraw/CanvasViewer";
import CurrentQuestionNumber from "./Tldraw/CurrentQuestionNumber";
import SideBarOfDraw from "./layout/SideBar/SideBarOfDraw";

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
        // newGameState["gamePagesIndex"] = gamePagesIndex + 1;
      } else {
        newGameState["gamePagesIndex"] = gamePagesIndex + 1;
      }
      changeGameStateHandler(newGameState);
    }
  }, [changeGameStateHandler, isOwner, questionsState.length, roomId]);
  const { getSolverId } = useSolver();

  const setQuestionEnd = useCallback(() => {
    const gamePagesIndex = yGameState.get(roomId)?.gamePagesIndex;
    gamePagesIndex &&
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
      {gameState &&
        gameState.path === "/draw" &&
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
      <Flex
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Box
          css={css`
            position: relative;
            width: 100%;
            height: 500px;
          `}
        >
          <Progress
            play={isPlay}
            startTime={gameState?.pageStartTime}
            time={20000000}
            callback={() => {
              setIsPlay("paused");
              questionTimeOut();
            }}
          ></Progress>
          {getSolverId() === providerState?.provider?.awareness?.clientID ? (
            <CanvasViewer
              pageIndex={gameState?.gamePagesIndex}
              CurrentQuestionNumber={<SideBarOfDraw />}
            />
          ) : (
            <DrawEditor
              pageIndex={gameState?.gamePagesIndex}
              CurrentQuestionNumber={<SideBarOfDraw />}
            />
          )}
          <Solver></Solver>
        </Box>
      </Flex>
    </>
  );
}
export default Draw;
