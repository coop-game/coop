import {
  userProfilesSelector,
  userSelector,
  yjsGameState,
} from "@common/recoil/recoil.atom";
import { providerState } from "@common/yjsStore/userStore";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import { useTranslation } from "@hooks/useTransitions";
import { useRecoilValue } from "recoil";

const RelayRaceStart = () => {
  const translation = useTranslation().messages;
  const { provider } = providerState;
  const { roomId } = useRecoilValue(userSelector) ?? {};


  // gameState.path에 따라 페이지 동기화
  useSyncPageFromGameState();
  // gameState가 바뀌면 recoil을 업데이트 해줌
  useGameStateUpdate(roomId);

  //yjs profile이 바귀면 recoil을 업데이트 해줌
  useProfileUpdate();

  // userProfiles
  const { userProfiles } = useRecoilValue(userProfilesSelector);
  const gameState = useRecoilValue(yjsGameState);

  console.log(userProfiles);
  console.log(gameState);

  if (provider === null) {
    return <div></div>;
  }
  
  return <div>test</div>;
};

export default RelayRaceStart;
