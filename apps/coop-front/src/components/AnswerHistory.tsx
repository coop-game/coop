import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { yjsGameState, yjsQuestionsState } from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

const AnswerHistory = () => {
  const { t } = useTranslation("common");
  const gameState = useRecoilValue(yjsGameState);
  const questionsState = useRecoilValue(yjsQuestionsState);
  const bg = useColorModeValue("#ffffff", "#000000");
  return (
    <Flex
      css={css`
        width: 100%;
      `}
    >
      <Flex
        bg={bg}
        css={css`
          border-radius: 15px;
          padding: 5px;
          justify-content: center;
          align-items: center;
        `}
      >
        {t("draw.answer.history")}
      </Flex>
      <Flex
        css={css`
          height: 40px;
          background: gray;
          overflow-y: scroll;
          border-radius: 15px;
          padding: 5px;
          align-items: center;
          overflow: hidden;
          position: relative;
          flex-grow: 1;
        `}
      >
        {questionsState.length >= gameState?.gamePagesIndex && (
          <Flex
            css={css`
              gap: 10px;
              flex-direction: row-reverse;
              overflow: hidden;
              justify-content: center;
              margin-left: 10px;
              position: absolute;
            `}
          >
            {questionsState[gameState.gamePagesIndex]?.inputAnswer.map(
              (v, idx) => {
                return (
                  <motion.div
                    animate={{
                      x: [-100, 0],
                      opacity: [0.8, 1],
                      scale: [0.8, 1],
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    key={idx}
                    css={css`
                      padding: 5px;
                      border-radius: 15px;
                      background: white;
                    `}
                  >
                    {v}
                  </motion.div>
                );
              }
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default AnswerHistory;
