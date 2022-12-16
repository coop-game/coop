import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import DraweeLogo from "../../src/asset/DraweeLogo.png";
import { css, keyframes } from "@emotion/react";
import TopContent from "./components/TopContent";
import MiddleContent from "./components/MiddleContent/index";

function welcome() {
  return (
    <Box bg="colors.primary" w="100%" minH="100vh" color="black" p={4}>
      {/* 최상단 부분  */}
      <Flex direction="column">
        <TopContent />
      </Flex>
      {/* 중간 그린다 부분 */}
      <Flex direction="column" w="100%" display="flex" alignItems="center" css={css`
       position:relative;
        z-index:10;`}>
        <MiddleContent></MiddleContent>
      </Flex>
      {/* 중간 맞춘다 부분 */}
      {/* 최하단 시작해보기 부분 */}
      <div css={css`
        background:gray;
        position:relative;
        z-index:1000;
      `}>

      {new Array(1000).fill(null).map((_,idx)=>(<div key={idx}>asdffadsfadssadf</div>))}

      </div>

    </Box>
  );
}

export default welcome;
