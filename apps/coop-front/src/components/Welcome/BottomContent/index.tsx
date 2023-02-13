import { Button, Center, Flex, Text } from "@chakra-ui/react";
import MotionDrawTools from "./MotionDrawTools";
import { useTranslation } from "next-i18next";
import Logo from "@components/Animation/Logo/Logo";
import { useRouter } from "next/router";

function BottomContent() {
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <Center w="100%" h="100vh" overflow={"hidden"}>
      <Flex direction="column">
        <Center
          marginTop={{ base: "50px", sm: "150px", md: "250px" }}
          position="relative"
        >
          <MotionDrawTools></MotionDrawTools>
          <Logo color={"blueviolet"}></Logo>
        </Center>

        <Center marginTop={{ base: "40px", sm: "10px", md: "40px" }} zIndex={2}>
          <Text fontSize={{ base: "6xl", sm: "3xl", md: "6xl" }}>
            {t("welcome.site.title")}
          </Text>
        </Center>
        <Center marginTop={{ base: "40px", sm: "10px", md: "40px" }} zIndex={2}>
          <Text
            fontSize={{ base: "4xl", sm: "2xl", md: "4xl" }}
            textAlign="center"
          >
            {t("welcome.site.play.now")}
          </Text>
        </Center>
        <Center
          marginTop={{ base: "70px", sm: "10px", md: "100px", lg: "60px" }}
          zIndex={2}
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
      </Flex>
    </Center>
  );
}

export default BottomContent;
