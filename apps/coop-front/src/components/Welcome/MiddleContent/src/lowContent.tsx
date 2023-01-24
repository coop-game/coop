import { css } from "@emotion/react";
import { nextContentType } from "@pages/welcome";
import useObserver from "hooks/useObserver";
import { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import Picture from "./lowImageScroll";
import { useRouter } from "next/dist/client/router";
import { FormattedMessage } from "react-intl";
import { motion, Variants } from "framer-motion";

function MiddleLowContent({
  setRatio,
  images,
}: {
  setRatio: ({ ratio, detect }: nextContentType) => void;
  images: StaticImageData[];
}) {
  const { isRatio, isDetect, targetRef } = useObserver();
  const router = useRouter();
  const pencilVariants: Variants = {
    offscreen: {
      x: `-300%`,
    },
    onscreen: {
      x: `-50%`,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 1,
      },
    },
  };
  const starVariants: Variants = {
    offscreen: {
      scale: 0,
    },
    onscreen: {
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.8,
        duration: 2,
      },
    },
  };
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
        <Flex flexDirection="column" w="100%" h="100%" position="relative">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 1 }}
            css={css`
              position: absolute;
              top: -1%;
              left: 30%;
              @media (max-width: 490px) {
                left: 40%;
              }
              @media (min-width: 760px) {
                left: 15%;
              }
              @media (min-width: 1000px) {
                left: 10%;
              }
              @media (min-width: 1500px) {
                left: 8%;
              }
            `}
          >
            <motion.div variants={starVariants}>
              <Image
                src="/images/writingToolsIcon/star_red_rotate.png"
                alt="연필"
                width={"50"}
                height={"50"}
              ></Image>
            </motion.div>
          </motion.div>
          <Text w="100%" top="5px" left="0px" fontSize="6xl" maxWidth="1024px">
            <FormattedMessage
              id={"welcome.site.correct"}
              values={{ locale: router.locale }}
            />
          </Text>

          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
          >
            <motion.div variants={pencilVariants}>
              <Image
                src="/images/writingToolsIcon/long_pencil_colorful.png"
                alt="연필"
                width={"2000"}
                height={"250"}
              ></Image>
            </motion.div>
          </motion.div>
        </Flex>
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
