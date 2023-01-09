import { yGameState } from "@common/yjsStore/userStore";
import { yQuestionsState } from "./../../../common/yjsStore/userStore";
import { useCallback, useEffect } from "react";
import {
  userProfilesSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";

const useSolver = () => {
  const gameState = useRecoilValue(yjsGameState);
  // const questionsState = useRecoilValue(yjsQuestionsState);
  const { userProfiles } = useRecoilValue(userProfilesSelector);

  const getSolverId = useCallback(() => {
    const questionsState = yQuestionsState.toArray();
    if (!questionsState || !gameState) return null;
    return questionsState.length >= gameState.gamePagesIndex
      ? questionsState[gameState.gamePagesIndex].solver
      : null;
  }, [gameState]);

  const getSovlerNicknameFromId = useCallback(
    (id: number) => {
      if (userProfiles)
        for (let e of userProfiles) {
          if (e.id === id) return e.nickname;
        }
      return null;
    },
    [userProfiles]
  );

  useEffect(() => {
    console.log("useSolver1", getSolverId());
    console.log("useSolver2", getSovlerNicknameFromId(getSolverId()));
  }, [getSolverId, getSovlerNicknameFromId]);

  return { getSolverId, getSovlerNicknameFromId };
};
export default useSolver;
