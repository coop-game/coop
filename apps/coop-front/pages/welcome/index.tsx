import { Box, Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
import TopContent from "@components/Welcome/TopContent";
import MiddleContent from "@components/Welcome/MiddleContent/index";
import { useState } from "react";
import MiddleLowContent from "@components/Welcome/MiddleContent/src/lowContent";
import stock1 from "../../src/asset/stock1.jpg";
import stock2 from "../../src/asset/stock2.jpg";
import stock3 from "../../src/asset/stock3.jpg";
import stock4 from "../../src/asset/stock4.jpg";
import BottomContent from "@components/Welcome/BottomContent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

export type nextContentType = {
  ratio: number | undefined;
  detect: boolean | undefined;
};

function Welcome() {
  const [nextContent, setNextContent] = useState<nextContentType>({
    ratio: undefined,
    detect: false,
  });
  const images = [stock1, stock2, stock3, stock4];
  const setRatio = ({ ratio, detect }: nextContentType) => {
    setNextContent({ ratio, detect });
  };
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
              ? 1 - nextContent.ratio * 5
              : 1
          }`,
        }}
      >
        <MiddleContent nextContent={nextContent}></MiddleContent>
      </Flex>
      {/* 중간 맞춘다 부분 */}
      <MiddleLowContent setRatio={setRatio} images={images} />
      {/* 최하단 시작해보기 부분 */}
      <Flex direction="column" h="100vh">
        <BottomContent />
      </Flex>
    </Box>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});

export default Welcome;
