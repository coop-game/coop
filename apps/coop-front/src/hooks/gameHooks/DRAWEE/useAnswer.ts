import { yjsGameState, yjsQuestionsState } from "@common/recoil/recoil.atom";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

const useAnswer = () => {
  const gameState = useRecoilValue(yjsGameState);
  const questionsState = useRecoilValue(yjsQuestionsState);
  const getAnswer = useCallback(() => {
    return questionsState.length > gameState.gamePagesIndex
      ? questionsState[gameState.gamePagesIndex].answer
      : null;
  }, [gameState.gamePagesIndex, questionsState]);
  return { getAnswer };
};
export default useAnswer;
