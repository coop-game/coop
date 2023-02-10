/** @jsxImportSource @emotion/react */

import { Box, Flex } from "@chakra-ui/react";
import MiddleContentPictureSlide from "@components/Welcome/MiddleContent/src/contents";

export default {
  title: "Animations/WelcomePitcureSlide",
  component: MiddleContentPictureSlide,
  argTypes: {
    nowDetect: {
      options: [1, 2, 3, 4],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => (
  <Flex position="absolute" w="100%" top="15vh">
    <MiddleContentPictureSlide index={args.nowDetect} />
  </Flex>
);

export const Primary = Template.bind({});

Primary.args = {
  nowDetect: 1,
};
