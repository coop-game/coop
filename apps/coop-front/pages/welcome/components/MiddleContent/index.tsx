import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import MiddleContentPictureSlide from "./src/contents";
import MiddleContentScrollDetector from "./src/detect";
import stock1 from "../../../../src/asset/stock1.jpg";
import stock2 from "../../../../src/asset/stock2.jpg";
import stock3 from "../../../../src/asset/stock3.jpg";
import stock4 from "../../../../src/asset/stock4.jpg";
import { motion } from "framer-motion";
import { nextContentType } from "@pages/welcome";

function MiddleContent({ nextContent }: { nextContent: nextContentType }) {
  const [nowDetect, setNowDetect] = useState<number>(1);
  const images = [stock1, stock2, stock3, stock4];

  const detectComponent = ({ index }: { index: number }) => {
    setNowDetect((prev) => {
      return index;
    });
  };
  return (
    <Box
      position="relative"
      zIndex="10"
      marginTop={{ base: "250px", sm: "200px", md: "80px" }}
      width="100%"
    >
      {/* 이미지 영역 */}
      <Box position="sticky" w="100%" top="0px" h="100vh" left="0px">
        <Box
          position="sticky"
          display="flex"
          justifyContent="center"
          width="100%"
          sx={{
            top: `${
              nextContent.detect && nextContent.ratio !== undefined
                ? -nextContent.ratio * 100
                : 0
            }px`,
          }}
        >
          <Text w="100%" left="0px" fontSize="6xl" maxWidth="1024px">
            그린다
          </Text>
          <Box position="absolute" top="15vh">
            <MiddleContentPictureSlide index={nowDetect} images={images} />
          </Box>
        </Box>
      </Box>
      {/* 현재 스크롤 위치를 감지하는 역할 */}
      {images.map((e, k) => (
        <MiddleContentScrollDetector
          key={k}
          detectComponent={detectComponent}
          index={k + 1}
        />
      ))}
    </Box>
  );
}

export default MiddleContent;
