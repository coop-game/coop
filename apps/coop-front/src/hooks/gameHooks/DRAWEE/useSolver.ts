import { useCallback } from "react";
import {
  userProfilesSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";

const useSolver = () => {
  const gameState = useRecoilValue(yjsGameState);
  const questionsState = useRecoilValue(yjsQuestionsState);
  const { userProfiles } = useRecoilValue(userProfilesSelector);

  const getSolverId = useCallback(() => {
    if (!questionsState || !gameState) return null;
    return questionsState.length > gameState.gamePagesIndex
      ? questionsState[gameState.gamePagesIndex].solver
      : null;
  }, [gameState, questionsState]);

  const getSovlerNicknameFromId = useCallback(
    (id: number) => {
      if (userProfiles === null) return null;
      let nickname = null;
      userProfiles.forEach((v) => {
        if (v.id === id) nickname = v.nickname;
      });
      return nickname;
    },
    [userProfiles]
  );

  return { getSolverId, getSovlerNicknameFromId };
};
export default useSolver;
