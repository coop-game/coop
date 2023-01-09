import {
  userProfilesSelector,
  userSelector,
  yjsGameState,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import {
  doc,
  getChangeGameStateHandler,
  providerState,
  yRelayRaceAnswerState,
} from "@common/yjsStore/userStore";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import { useTranslation } from "@hooks/useTransitions";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import shuffle from "lodash/shuffle";
import { CPGameRelayRace, CPGameRelayRaceAnswer, CPGameState } from "@types";
import Wating from "./Wating";
import { Box } from "@chakra-ui/react";
import useArrayUpdate from "@hooks/gameHooks/updateState/useArrayUpdate";
import AnswerInput from "./AnswerInput";
import AnswerDraw from "./AnswerDraw";

const RelayRaceStart = () => {
  const translation = useTranslation().messages;
  const { provider } = providerState;
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const [myOrderNumber, setMyOrderNumber] = useState<number>();
  const [relayRaceAnswerState, setState] = useRecoilState<
    CPGameRelayRaceAnswer[]
  >(yjsRelayRaceAnswerState);

  // gameState.path에 따라 페이지 동기화
  useSyncPageFromGameState();
  // gameState가 바뀌면 recoil을 업데이트 해줌
  useGameStateUpdate(roomId);

  //yjs profile이 바귀면 recoil을 업데이트 해줌
  useProfileUpdate();

  // userProfiles
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const gameState = useRecoilValue(yjsGameState) as CPGameRelayRace;
  const [isPlay, setIsPlay] = useState<"running" | "paused">("running");

  // gameStateHandler 게임 상태값 변하게 하는 핸들러
  const changeGameStateHandler =
    getChangeGameStateHandler<CPGameRelayRace>(roomId);

  console.log(gameState);
  console.log("relayRace", relayRaceAnswerState);

  const { pushArrayHandler } = useArrayUpdate<CPGameRelayRaceAnswer>({
    yjsState: yRelayRaceAnswerState,
    setState: setState,
  });

  useEffect(() => {
    if (isOwner && relayRaceAnswerState && relayRaceAnswerState.length !== 0) {
      if (relayRaceAnswerState.length >= gameState.gameOrderNumber.length) {
        changeGameStateHandler({
          path: "/result",
        });
      } else if (isOwner) {
        changeGameStateHandler({
          gamePagesIndex: gameState.gamePagesIndex + 1,
        });
      }
    }
    setIsPlay("paused");
  }, [relayRaceAnswerState.length]);

  useEffect(() => {
    if (isOwner) {
      const copyUserClientId = userProfiles.map((e) => {
        return e.id;
      });
      const shuffleUserId = shuffle(copyUserClientId);
      changeGameStateHandler({ gameOrderNumber: shuffleUserId });
    }
  }, [isOwner]);

  useEffect(() => {
    if (
      gameState &&
      gameState.gameOrderNumber &&
      gameState.gameOrderNumber.length > 0
    ) {
      const myId = doc.clientID;
      let result = 0;
      let index = 0;
      for (let i of gameState.gameOrderNumber) {
        if (i === myId) {
          result = index;
          break;
        }
        index++;
      }
      setMyOrderNumber(result);
    }
  }, [gameState]);
  // 프로바이더가 없는 경우 아무것도 렌더링 하지 않음
  if (provider === null) {
    return <div></div>;
  }
  // 내 순서가 아닌 경우 대기실에 들어가서 대기
  if (
    myOrderNumber !== undefined &&
    gameState.gamePagesIndex !== myOrderNumber
  ) {
    return (
      <Box w="100%" h="100%">
        <Wating isPlay={isPlay} setIsPlay={setIsPlay} />
      </Box>
    );
  }
  // 내 순서인 경우 정답을 입력하거나 그림을 그리러 간다.
  else if (
    myOrderNumber !== undefined &&
    gameState.gamePagesIndex === myOrderNumber
  ) {
    if (gameState.gamePagesIndex % 2 === 0) {
      return (
        <Box w="100%" h="100%">
          <AnswerInput
            gamepageIndex={gameState.gamePagesIndex}
            pushArrayHandler={pushArrayHandler}
            startTime={gameState.pageStartTime}
          ></AnswerInput>
        </Box>
      );
    } else {
      return (
        <Box w="100%" h="100%">
          <AnswerDraw
            gamepageIndex={gameState.gamePagesIndex}
            pushArrayHandler={pushArrayHandler}
            startTime={gameState.pageStartTime}
          />
        </Box>
      );
    }
  }
  return <div>test</div>;
};

export default RelayRaceStart;
