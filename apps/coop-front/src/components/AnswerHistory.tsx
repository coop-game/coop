import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { yjsGameState, yjsQuestionsState } from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import HistoryScroll from "./Scroll/HistoryScroll";

const AnswerHistory = () => {
  const { t } = useTranslation("common");
  const gameState = useRecoilValue(yjsGameState);
  const questionsState = useRecoilValue(yjsQuestionsState);
  const bg = useColorModeValue("#ffffff", "#000000");

  return (
    <Flex
      css={css`
        width: 100%;
        height: 100px;
        position: relative;
      `}
    >
      <Flex
        bg={bg}
        shadow={"base"}
        css={css`
          position: absolute;
          top: 10px;
          left: 20px;
          border-radius: 8px;
          padding: 5px;
          justify-content: center;
          align-items: center;
          z-index: 10;
        `}
      >
        {t("draw.answer.history")}
      </Flex>
      <Flex
        shadow={"base"}
        css={css`
          height: 100%;
          /* background: #ffffff84;
          border-radius: 15px; */
          align-items: center;
          /* overflow: scroll hidden; */
          position: relative;
          margin-left: 10px;
          flex-grow: 1;
        `}
      >
        {questionsState.length >= gameState?.gamePagesIndex && (
          <Flex
            css={css`
              gap: 10px;
              background: #ffffff84;
              border-radius: 8px;
              /* padding: 5px; */
              flex-direction: row-reverse;
              justify-content: center;
              /* position: absolute; */
              user-select: none;
              width: 100%;
              height: 100%;
            `}
          >
            {questionsState[gameState.gamePagesIndex]?.inputAnswer && (
              <HistoryScroll
                history={questionsState[gameState.gamePagesIndex]?.inputAnswer}
              ></HistoryScroll>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default AnswerHistory;
