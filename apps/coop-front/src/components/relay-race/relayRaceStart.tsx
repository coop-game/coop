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

const RelayRaceStart = () => {
  const translation = useTranslation().messages;
  const { provider } = providerState;
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const [myOrderNumber, setMyOrderNumber] = useState<number>();
  const [answerLengthState, setAnswerLengthState] = useState<number>(0);

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

  // gameStateHandler 게임 상태값 변하게 하는 핸들러
  const changeGameStateHandler =
    getChangeGameStateHandler<CPGameRelayRace>(roomId);

  console.log(userProfiles);
  console.log(gameState);
  useEffect(() => {
    console.log("relayRace", relayRaceAnswerState);
  }, [relayRaceAnswerState, relayRaceAnswerState.length]);




  useArrayUpdate<CPGameRelayRaceAnswer>({
    yjsState: yRelayRaceAnswerState,
    setState: setState,
  });

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
  if (provider === null) {
    return <div></div>;
  }
  if (
    myOrderNumber !== undefined &&
    gameState.gamePagesIndex !== myOrderNumber
  ) {
    return (
      <Box w="100%" h="100%">
        <Wating />
      </Box>
    );
  } else if (
    myOrderNumber !== undefined &&
    gameState.gamePagesIndex === myOrderNumber
  ) {
    return (
      <div>
        <AnswerInput
          changeGameStateHandler={changeGameStateHandler}
        ></AnswerInput>
      </div>
    );
  }
  return <div>test</div>;
};

export default RelayRaceStart;
