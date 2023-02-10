import { Center, Flex } from "@chakra-ui/react";
import MotionDrawTools from "@components/Welcome/BottomContent/MotionDrawTools";

export default {
  title: "Animations/WelcomeSpradeDrawingTools",
  component: MotionDrawTools,
};

const Template = (args) => (
  <Center w="100%" h="100vh">
    <Flex direction="column">
      <Center
        marginTop={{ base: "50px", sm: "150px", md: "250px" }}
        position="relative"
      >
        <MotionDrawTools />
      </Center>
    </Flex>
  </Center>
);

export const Primary = Template.bind({});
