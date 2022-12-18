import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import DraweeLogo from "../../../../src/asset/DraweeLogo.png";

function BottomContent() {
  return (
    <Center w="100%" h="max-content">
      <Flex direction="column">
        <Center marginTop={{ base: "50px", sm: "10px", md: "50px" }}>
          <Image src={DraweeLogo} width={300} height={300} alt="로고이미지" />
        </Center>
        <Center marginTop={{ base: "40px", sm: "20px", md: "40px" }}>
          <Text fontSize={{ base: "6xl", sm: "3xl", md: "6xl" }}>
            협동 조합 게임!
          </Text>
        </Center>
        <Center marginTop={{ base: "40px", sm: "20px", md: "40px" }}>
          <Text
            fontSize={{ base: "4xl", sm: "2xl", md: "4xl" }}
            textAlign="center"
          >
            지금 당장 시작해보세요!
          </Text>
        </Center>
        <Center
          marginTop={{ base: "70px", sm: "30px", md: "100px", lg: "60px" }}
        >
          <Button width="150px" bg="colors.third">
            시작하기
          </Button>
        </Center>
      </Flex>
    </Center>
  );
}

export default BottomContent;
