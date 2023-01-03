import {
  userProfilesSelector,
  userSelector,
  yjsGameState,
} from "@common/recoil/recoil.atom";
import {
  doc,
  getChangeGameStateHandler,
  providerState,
} from "@common/yjsStore/userStore";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import { useTranslation } from "@hooks/useTransitions";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import _ from "lodash";
import { CPGameRelayRace, CPGameState } from "@types";

const RelayRaceStart = () => {
  const translation = useTranslation().messages;
  const { provider } = providerState;
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const [myOrderNumber, setMyOrderNumber] = useState<number>();

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
    if (isOwner) {
      const copyUserClientId = userProfiles.map((e) => {
        return e.id;
      });
      const shuffleUserId = _.shuffle(copyUserClientId);
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
      gameState.gameOrderNumber.forEach((e, i) => {
        if (e === myId) {
          result = i;
          return;
        }
      });
    }
  }, [gameState]);
  if (provider === null) {
    return <div></div>;
  }

  return <div>test</div>;
};

export default RelayRaceStart;
