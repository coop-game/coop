/** @jsxImportSource @emotion/react */
import useAnswer from "@hooks/gameHooks/DRAWEE/useAnswer";
import useSolver from "@hooks/gameHooks/DRAWEE/useSolver";
import { Dispatch, SetStateAction, useEffect } from "react";
import AnswerModalFromChakra from "./AnswerModalFromChakra";
import AnswerResult from "./AnswerResult";

type AnswerModalPropsType = {
  setIsPlay: Dispatch<SetStateAction<"paused" | "running">>;
  onClose: () => void;
};

const AnswerModal = (props: AnswerModalPropsType) => {
  const { getSolverId, getSovlerNicknameFromId } = useSolver();
  const { getAnswer, isAnswerInArray } = useAnswer();

  const solverNickname = getSovlerNicknameFromId(getSolverId());
  const answer = getAnswer();

  useEffect(() => {
    props.setIsPlay("paused");
    return () => {
      props.setIsPlay("running");
    };
  }, [props]);

  return (
    <AnswerModalFromChakra onCloseHandler={props.onClose}>
      <AnswerResult
        solverNickname={solverNickname}
        answer={answer}
        isCorrect={isAnswerInArray()}
      ></AnswerResult>
    </AnswerModalFromChakra>
  );
};
export default AnswerModal;
