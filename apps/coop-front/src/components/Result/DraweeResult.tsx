import { Box } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsQuestionsState,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import CanvasViewer from "@components/CanvasViewer";
import { CPGameQuestions, CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const DraweeResult = ({ nowPageIndex }: { nowPageIndex: number }) => {
  const questionState = useRecoilValue<CPGameQuestions>(yjsQuestionsState);
  const { userProfiles } = useRecoilValue(userProfilesSelector);
  
  console.log(questionState);
  return (
    <Box w="100%" height="100%">
      <Box w="80%" height="80%">
        <CanvasViewer pageIndex={nowPageIndex} />
      </Box>
    </Box>
  );
};

export default DraweeResult;
