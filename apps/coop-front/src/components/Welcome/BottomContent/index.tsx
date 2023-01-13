import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import DraweeLogo from "@asset/images/DraweeLogo.png";
import { css } from "@emotion/react";
import MotionDrawTools from "./MotionDrawTools";

function BottomContent() {
  return (
    <Center w="100%" h="max-content">
      <Flex direction="column">
        <Center
          marginTop={{ base: "50px", sm: "250px", md: "250px" }}
          position="relative"
        >
          <MotionDrawTools></MotionDrawTools>
          <Image
            src={DraweeLogo}
            width={300}
            height={300}
            alt="로고이미지"
            css={css`
              z-index: 2;
            `}
          />
        </Center>

        <Center marginTop={{ base: "40px", sm: "20px", md: "40px" }} zIndex={2}>
          <Text fontSize={{ base: "6xl", sm: "3xl", md: "6xl" }}>
            협동 조합 게임!
          </Text>
        </Center>
        <Center marginTop={{ base: "40px", sm: "20px", md: "40px" }} zIndex={2}>
          <Text
            fontSize={{ base: "4xl", sm: "2xl", md: "4xl" }}
            textAlign="center"
          >
            지금 당장 시작해보세요!
          </Text>
        </Center>
        <Center
          marginTop={{ base: "70px", sm: "30px", md: "100px", lg: "60px" }}
          zIndex={2}
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
