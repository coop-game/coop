import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import DraweeLogo from "../../../src/asset/DraweeLogo.png";
import { css, keyframes } from "@emotion/react";

const scroll = keyframes`
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
    transform: translateY(46px);
  }
`;
function TopContent() {
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
            다른 사람들과 함께 그림을 그리고 정답을 맞춰보세요!
          </Text>
        </Center>
        <Center marginTop={{ base: "20px", sm: "10px", md: "20px" }}>
          <Text
            fontSize={{ base: "2xl", sm: "lg", md: "2xl" }}
            textAlign="center"
          >
            협동 조합 게임은 팀을 짜고 함께 그림을 그리는 게임 입니다.
          </Text>
        </Center>
        <Center marginTop={{ base: "10px", sm: "5px", md: "10px" }}>
          <Text
            fontSize={{ base: "2xl", sm: "lg", md: "2xl" }}
            textAlign="center"
          >
            최대 5명의 사람이 제시어를 보고 그리면 나머지 한명이 그림을 보고
            제시어를 맞추는 방식입니다.
          </Text>
        </Center>
        <Center
          marginTop={{ base: "70px", sm: "30px", md: "100px", lg: "60px" }}
        >
          <Button width="150px" bg="colors.third">
            시작하기
          </Button>
        </Center>
        <Center>
          <div
            css={css`
              width: 40px;
              height: 65px;
              top: 50%;
              margin-top: 50px;
              box-shadow: inset 0 0 0 1px #000;
              border-radius: 25px;
              display: flex;
              justify-content: center;
            `}
          >
            <div
              css={css`
                width: 8px;
                height: 8px;
                background: #000;
                margin-top: 4px;
                top: 8px;
                border-radius: 4px;
                animation: ${scroll} 1.5s infinite;
              `}
            ></div>
          </div>
        </Center>
      </Flex>
    </Center>
  );
}

export default TopContent;
