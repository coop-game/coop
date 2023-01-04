import { Flex, transition } from "@chakra-ui/react";
import ChakraModal from "@components/Modal/ChakraModal";
import { css } from "@emotion/react";
import useAnswer from "@hooks/gameHooks/DRAWEE/useAnswer";
import useSolver from "@hooks/gameHooks/DRAWEE/useSolver";
import { useTranslation } from "@hooks/useTransitions";
import { Dispatch, SetStateAction, useEffect } from "react";

type AnswerModalPropsType = {
  setIsPlay: Dispatch<SetStateAction<"paused" | "running">>;
  onClose: () => void;
};

type AnswerPropsType = { solverNickname: string; answer: string };
const Answer = ({ solverNickname, answer }: AnswerPropsType) => {
  const translation = useTranslation().messages;
  return (
    <Flex
      fontSize={{ base: "2rem", md: "3rem", xl: "4rem" }}
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div>
        <>{`${translation["draw.modal.answer"]} : ${answer}`}</>
      </div>
      <div>
        {`${solverNickname} ${translation["draw.modal.correct.answer"]}`}
      </div>
    </Flex>
  );
};
const WrongAnswer = ({ solverNickname, answer }: AnswerPropsType) => {
  const translation = useTranslation().messages;
  return (
    <Flex
      fontSize={{ base: "2rem", md: "3rem", xl: "4rem" }}
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div>
        <>{`${translation["draw.modal.answer"]} : ${answer}`}</>
      </div>
      <div>{`${solverNickname} 정답을 맞추지 못함`}</div>
    </Flex>
  );
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
    <ChakraModal onCloseHandler={props.onClose}>
      {isAnswerInArray() ? (
        <Answer solverNickname={solverNickname} answer={answer} />
      ) : (
        <WrongAnswer
          solverNickname={solverNickname}
          answer={answer}
        ></WrongAnswer>
      )}
    </ChakraModal>
  );
};
export default AnswerModal;
