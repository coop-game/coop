import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Logo from "@components/Animation/Logo/Logo";

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
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <Center w="100%" h="100vh">
      <Flex direction="column">
        <Center marginTop={{ base: "50px", sm: "10px", md: "50px" }}>
          <Logo color={"blueviolet"}></Logo>
        </Center>
        <Center marginTop={{ base: "40px", sm: "20px", md: "40px" }}>
          <Text fontSize={{ base: "6xl", sm: "3xl", md: "6xl" }}>
            {t("welcome.site.title")}
          </Text>
        </Center>
        <Center marginTop={{ base: "40px", sm: "20px", md: "40px" }}>
          <Text
            fontSize={{ base: "4xl", sm: "2xl", md: "4xl" }}
            textAlign="center"
          >
            {t("welcome.site.tutorial1")}
          </Text>
        </Center>
        <Center marginTop={{ base: "20px", sm: "10px", md: "20px" }}>
          <Text
            fontSize={{ base: "2xl", sm: "lg", md: "2xl" }}
            textAlign="center"
          >
            {t("welcome.site.tutorial2")}
          </Text>
        </Center>
        <Center marginTop={{ base: "10px", sm: "5px", md: "10px" }}>
          <Text
            fontSize={{ base: "2xl", sm: "lg", md: "2xl" }}
            textAlign="center"
          >
            {t("welcome.site.tutorial3")}
          </Text>
        </Center>
        <Center
          marginTop={{ base: "70px", sm: "30px", md: "100px", lg: "60px" }}
        >
          <Button
            width="150px"
            bg="colors.third"
            onClick={() => {
              router.push("/games");
            }}
          >
            {t("welcome.site.start.button")}
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
