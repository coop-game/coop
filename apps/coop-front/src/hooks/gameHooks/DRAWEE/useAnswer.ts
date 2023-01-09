import { yjsGameState, yjsQuestionsState } from "@common/recoil/recoil.atom";
import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";

const useAnswer = () => {
  const gameState = useRecoilValue(yjsGameState);
  const questionsState = useRecoilValue(yjsQuestionsState);

  const getAnswer = useCallback(() => {
    return questionsState.length >= gameState.gamePagesIndex
      ? questionsState[gameState.gamePagesIndex].answer
      : null;
  }, [gameState.gamePagesIndex, questionsState]);

  const isAnswerInArray = useCallback(() => {
    if (gameState && questionsState.length >= gameState.gamePagesIndex) {
      const question = questionsState[gameState.gamePagesIndex];
      return question.inputAnswer.includes(question.answer);
    }
  }, [gameState, questionsState]);

  return { getAnswer, isAnswerInArray };
};
export default useAnswer;
