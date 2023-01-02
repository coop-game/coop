import { Flex } from "@chakra-ui/react";
import ChakraModal from "@components/Modal/ChakraModal";
import { css } from "@emotion/react";

const AnswerModal = () => {
  return (
    <ChakraModal
      onCloseHandler={() => {
        console.log("asdfa????");
      }}
    >
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
        <div>정답!</div>
        <div
          css={css`
        정답자
      `}
        >
          Solver
        </div>
        <div>???? 이 정답을 맞췄습니다</div>
      </Flex>
    </ChakraModal>
  );
};
export default AnswerModal;
