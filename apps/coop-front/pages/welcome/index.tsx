import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import TopContent from "./components/TopContent";
import MiddleContent from "./components/MiddleContent/index";
import MiddleContentLineDetect from "./components/MiddleContent/src/lineDetect";
import { motion } from "framer-motion";
import { useState } from "react";

export type nextContentType = {
  ratio: number | undefined;
  detect: boolean | undefined;
};

function Welcome() {
  const [nextContent, setNextContent] = useState<nextContentType>({
    ratio: undefined,
    detect: false,
  });
  const setRatio = ({ ratio, detect }: nextContentType) => {
    setNextContent({ ratio, detect });
  };

  console.log(nextContent);
  return (
    <Box bg="colors.primary" w="100%" minH="100vh" color="black" p={4}>
      {/* 최상단 부분  */}
      <Flex direction="column">
        <TopContent />
      </Flex>
      {/* 중간 그린다 부분 */}
      <Flex
        direction="column"
        w="100%"
        display="flex"
        alignItems="center"
        css={css`
          position: relative;
          z-index: 10;
        `}
        sx={{
          opacity: `${
            nextContent.detect && nextContent.ratio !== undefined
              ? 1 - nextContent.ratio
              : 1
          }`,
        }}
      >
        <MiddleContent nextContent={nextContent}></MiddleContent>
      </Flex>
      {/* 중간 맞춘다 부분 */}
      <MiddleContentLineDetect setRatio={setRatio} />
      {/* 최하단 시작해보기 부분 */}
    </Box>
  );
}

export default Welcome;
