import { Box, Center, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import MiddleContentPictureSlide from "./src/contents";
import MiddleContentScrollDetector from "./src/detect";
import { css } from "@emotion/react";

type view = {
  index: number;
  viewport: boolean;
};

function MiddleContent() {
  const [detectView, setDectView] = useState<view[]>([
    {
      index: 1,
      viewport: false,
    },
    {
      index: 2,
      viewport: false,
    },
    {
      index: 3,
      viewport: false,
    },
    {
      index: 4,
      viewport: false,
    },
  ]);
  const [nowDetect, setNowDetect] = useState<number>(1);

  const detectComponent = ({ index, viewport }: view) => {
    let temp = [...detectView];
    let dectList = temp.map((e) => {
      if (index == e.index && viewport) {
        return { index: e.index, viewport: true };
      } else {
        return { index: e.index, viewport: false };
      }
    });
    setNowDetect((prev) => {
      return index;
    });
    setDectView(dectList);
  };
  console.log(detectView);
  return (
    <Box
      position="relative"
      zIndex="10"
      marginTop={{ base: "250px", sm: "200px", md: "80px" }}
      width="100%"
    >
      <Box position="sticky" w="100%" top="0px" h="100vh" left="0px">
        <Box
          position="sticky"
          display="flex"
          justifyContent="center"
          top="0px"
          width="100%"

        >
          <Text w="100%" left="0px" fontSize="6xl" maxWidth="1024px">
            그린다
          </Text>
          <Box position="absolute" top="15vh"
>
            <MiddleContentPictureSlide index={nowDetect} />
          </Box>
        </Box>
      </Box>
      <MiddleContentScrollDetector
        detectComponent={detectComponent}
        index={1}
      />
      <MiddleContentScrollDetector
        detectComponent={detectComponent}
        index={2}
      />
      <MiddleContentScrollDetector
        detectComponent={detectComponent}
        index={3}
      />
      <MiddleContentScrollDetector
        detectComponent={detectComponent}
        index={4}
      />
    </Box>
  );
}

export default MiddleContent;
