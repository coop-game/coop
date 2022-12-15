import { Box, Text } from "@chakra-ui/react";
import stock1 from "../../../../../src/asset/stock1.jpg";
import stock2 from "../../../../../src/asset/stock2.jpg";
import stock3 from "../../../../../src/asset/stock3.jpg";
import stock4 from "../../../../../src/asset/stock4.jpg";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { css, keyframes } from "@emotion/react";

function MiddleContentPictureSlide({ index }: { index: number }) {
  const [position, setPosition] = useState(1);
  const positionRef = useRef<HTMLDivElement>(null);
  if (positionRef !== null && positionRef.current) {
    positionRef.current.onanimationend = () => {
      setPosition(index);
    };
  }
  console.log("position", position);
  const pictureMove = keyframes`
  from {
    transform: translateX(${position});
  } to{
    transform: translateX(${(+index - 1) * -25}%);
  }
`;
  return (
    <div
      css={css`
        position: relative;
        width: max-content;
        overflow-x: hidden;
      `}
    >
      <div
        ref={positionRef}
        css={css`
          transform: translateX(${(position - 1) * -25}%);
          display: flex;
          width: 100%;
          animation: ${pictureMove} 1s ease;
        `}
      >
        <Box
          left="50%"
          transform="translateX(-50%)"
          width="800px"
          position="relative"
        >
          <Image src={stock1} alt="테스트 이미지"></Image>
        </Box>
        <Box
          left="50%"
          transform="translateX(-50%)"
          width="800px"
          position="relative"
        >
          <Image src={stock2} alt="테스트 이미지"></Image>
        </Box>
        <Box
          left="50%"
          transform="translateX(-50%)"
          width="800px"
          position="relative"
        >
          <Image src={stock3} alt="테스트 이미지"></Image>
        </Box>
        <Box
          left="50%"
          transform="translateX(-50%)"
          width="800px"
          position="relative"
        >
          <Image src={stock4} alt="테스트 이미지"></Image>
        </Box>
      </div>
    </div>
  );
}

export default MiddleContentPictureSlide;
