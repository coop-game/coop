import { css } from "@emotion/react";
import { nextContentType } from "@pages/welcome";
import useObserver from "hooks/useObserver";
import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import Picture from "./lowImageScroll";

function MiddleLowContent({
  setRatio,
  images,
}: {
  setRatio: ({ ratio, detect }: nextContentType) => void;
  images: StaticImageData[];
}) {
  const { isRatio, isDetect, targetRef } = useObserver();
  useEffect(() => {
    if (isRatio !== undefined && isDetect) {
      setRatio({ ratio: isRatio, detect: isDetect });
    } else {
      setRatio({ ratio: undefined, detect: false });
    }
  }, [isDetect, isRatio]);

  return (
    <Box w="100%" bg="colors.primary" position="relative" zIndex="1000">
      <Box
        w="100%"
        position="sticky"
        top="0px"
        bg="colors.primary"
        display="flex"
        zIndex="1000"
        justifyContent="center"
      >
        <Text w="100%" top="5px" left="0px" fontSize="6xl" maxWidth="1024px">
          맞춘다
        </Text>
      </Box>
      <div
        ref={targetRef}
        css={css`
          width: 100%;
          min-height: 100vh;
          height: max-content;
          display: flex;
          align-items: center;
          flex-direction: column;
          /* overflow-y: scroll; */
          /* scroll-snap-type: y mandatory; */
        `}
      >
        {images.map((e, i) => (
          <div
            key={i}
            css={css`
              /* width: 100%; */
              height: 100vh;
              display: flex;
              align-items: center;
              /* scroll-snap-align: start; */
            `}
          >
            <Picture images={e} />
          </div>
        ))}
      </div>
    </Box>
  );
}

export default MiddleLowContent;
