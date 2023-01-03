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

const AnswerModal = (props: AnswerModalPropsType) => {
  const { getSolverId, getSovlerNicknameFromId } = useSolver();
  const { getAnswer } = useAnswer();

  const translation = useTranslation().messages;

  useEffect(() => {
    props.setIsPlay("paused");
    return () => {
      props.setIsPlay("running");
    };
  }, [props]);
  return (
    <ChakraModal onCloseHandler={props.onClose}>
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
          <>{`${translation["draw.modal.answer"]} : ${getAnswer()}`}</>
        </div>
        <div>
          {`${getSovlerNicknameFromId(getSolverId())} ${
            translation["draw.modal.correct.answer"]
          }`}
        </div>
      </Flex>
    </ChakraModal>
  );
};
export default AnswerModal;
