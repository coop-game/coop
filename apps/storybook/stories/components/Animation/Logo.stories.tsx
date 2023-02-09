/** @jsxImportSource @emotion/react */

import { Flex } from "@chakra-ui/react";
import Logo from "@components/Animation/Logo/Logo";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
export default {
  title: "Animations/Logo",
  component: Logo,
};

const Template = (args) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      height: 100%;
    `}
  >
    <Flex
      css={css`
        position: relative;
        flex-grow: 1;
        height: 130px;
        @media screen and (max-width: 600px) {
          height: 70px;
          transform-origin: 50% 10%;
          transform: scale(0.5);
        }
      `}
    >
      <motion.div>
        <Logo color={"#721480"}></Logo>
      </motion.div>
    </Flex>
  </div>
);

export const Primary = Template.bind({});
