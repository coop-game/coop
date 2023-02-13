/** @jsxImportSource @emotion/react */
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import MiddleContentPictureSlide from "./src/contents";
import MiddleContentScrollDetector from "./src/detect";
import stock1 from "../../../../src/asset/stock1.jpg";
import stock2 from "../../../../src/asset/stock2.jpg";
import stock3 from "../../../../src/asset/stock3.jpg";
import stock4 from "../../../../src/asset/stock4.jpg";
import { motion, Variants } from "framer-motion";
import { nextContentType } from "@pages/index";
import Image from "next/image";
import { css } from "@emotion/react";
import { useRouter } from "next/dist/client/router";
import { useTranslation } from "next-i18next";

function MiddleContent({ nextContent }: { nextContent: nextContentType }) {
  const [nowDetect, setNowDetect] = useState<number>(1);
  const images = [stock1, stock2, stock3, stock4];
  const { locale } = useRouter();
  const { t } = useTranslation("common");

  const detectComponent = ({ index }: { index: number }) => {
    setNowDetect((prev) => {
      return index;
    });
  };
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
          height="100%"
          sx={{
            top: `${
              nextContent.detect && nextContent.ratio !== undefined
                ? -nextContent.ratio * 100
                : 0
            }px`,
          }}
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
            <Text w="100%" left="0px" fontSize="6xl" maxWidth="1024px">
              {t("welcome.site.drawing")}
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
          <Box position="absolute" w="100%" top="15vh">
            <MiddleContentPictureSlide index={nowDetect} />
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
