/** @jsxImportSource @emotion/react */

import { Box, Flex, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { motion, Variants } from "framer-motion";
import { t } from "i18next";
import Image from "next/image";

export default {
  title: "animations/SlidePencil_Star",
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
const Template = (args) => (
  <Box
    position="sticky"
    w="100%"
    top="0px"
    h="100vh"
    left="0px"
    display="flex"
    justifyContent="center"
  >
    <Flex flexDirection="column" w="100%" h="100%" position="relative">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 1 }}
      >
        <motion.div
          css={css`
            left: 100px;
            position: absolute;
          `}
          variants={starVariants}
        >
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
  </Box>
);

export const Primary = Template.bind({});
