import { Center, Flex } from "@chakra-ui/react";
import MotionDrawTools from "@components/Welcome/BottomContent/MotionDrawTools";

export default {
  title: "Animations/WelcomeSpradeDrawingTools",
  component: MotionDrawTools,
};

const Template = (args) => (
  <Center w="100vw" h="100vh" marginTop={{ md: "450px" }} position="relative">
    <MotionDrawTools />
  </Center>
);

export const Primary = Template.bind({});
