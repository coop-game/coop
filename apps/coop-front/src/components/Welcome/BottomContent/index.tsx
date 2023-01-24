import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import DraweeLogo from "@asset/images/DraweeLogo.png";
import { css } from "@emotion/react";
import MotionDrawTools from "./MotionDrawTools";
import { useRouter } from "next/dist/client/router";
import { FormattedMessage } from "react-intl";

function BottomContent() {
  const { locale } = useRouter();
  return (
    <Center w="100%" h="100vh" overflow={"hidden"}>
      <Flex direction="column">
        <Center
          marginTop={{ base: "50px", sm: "150px", md: "250px" }}
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

        <Center marginTop={{ base: "40px", sm: "10px", md: "40px" }} zIndex={2}>
          <Text fontSize={{ base: "6xl", sm: "3xl", md: "6xl" }}>
            <FormattedMessage
              id={"welcome.site.title"}
              values={{ locale: locale }}
            />
          </Text>
        </Center>
        <Center marginTop={{ base: "40px", sm: "10px", md: "40px" }} zIndex={2}>
          <Text
            fontSize={{ base: "4xl", sm: "2xl", md: "4xl" }}
            textAlign="center"
          >
            <FormattedMessage
              id={"welcome.site.play.now"}
              values={{ locale }}
            />
          </Text>
        </Center>
        <Center
          marginTop={{ base: "70px", sm: "10px", md: "100px", lg: "60px" }}
          zIndex={2}
        >
          <Button width="150px" bg="colors.third">
            <FormattedMessage
              id={"welcome.site.start.button"}
              values={{ locale }}
            />
          </Button>
        </Center>
      </Flex>
    </Center>
  );
}

export default BottomContent;
