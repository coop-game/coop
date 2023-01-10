import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import DraweeLogo from "@asset/images/DraweeLogo.png";
import lodashRandom from "lodash/random";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { userSelector } from "@common/recoil/recoil.atom";
import { nanoid } from "nanoid";
import { useTranslation } from "@hooks/useTransitions";
import { useRecoilState } from "recoil";
import AvatarImage from "@components/AvatarImage";
import { providerState } from "@common/yjsStore/userStore";
import getUtcTimeStamp from "@common/lib/getUtcTimeStamp";
import Layout from "@components/layout";
import LogoImage from "@components/layout/LogoImage";
import useHistoryBack from "@hooks/usehistoryBack";

export default function Home({
  roomId,
  isCreater,
}: {
  roomId: string;
  isCreater: boolean;
}) {
  const translation = useTranslation().messages;
  const [_, setUserState] = useRecoilState(userSelector);
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [isError, setIsError] = useState(true);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [color, setColor] = useState("#000000");

  const getRandomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  const randomAvatarHandler = useCallback(() => {
    setAvatarIndex(lodashRandom(9));
    setColor(getRandomColor());
  }, []);

  useHistoryBack();

  const pushLobbyHander = () => {
    if (nickname !== "") {
      providerState.createProvider(roomId);
      // if (!providerState.provider) {
      //   providerState.clearProvider();
      // }
      const utcTimeStamp = getUtcTimeStamp();
      setUserState({ roomId, nickname, avatarIndex, color, utcTimeStamp });
      router.push("/lobby");
    } else {
      setIsError(true);
    }
  };

  return (
    <div>
      <Layout>
        <LogoImage
          src={DraweeLogo}
          height={150}
          width={150}
          heightPadding={25}
        />
        <Flex
          w={"100%"}
          h={"100%"}
          minHeight={"500px"}
          p="1em"
          justifyContent={"center"}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: "10px", md: "20px" }}
        >
          <Flex
            w={{ base: "100%", md: "350px", xl: "600px" }}
            height="100%"
            borderRadius={"15px"}
            border="3px solid gray"
            boxShadow="dark-lg"
            rounded="md"
            p={10}
            flexDirection={"column"}
            minHeight={"500px"}
          >
            <AvatarImage
              avatarIndex={avatarIndex}
              borderColor={color}
              randomAvatarHandler={randomAvatarHandler}
            ></AvatarImage>
            <FormControl isInvalid={isError}>
              <FormLabel>{translation["user.nickname"]}</FormLabel>
              <Input
                type="email"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setIsError(e.target.value === "");
                }}
              />
              <Flex ml={5}>
                {!isError ? (
                  <FormHelperText>
                    {translation["user.success.nickname"]}
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {translation["user.required.nickname"]}
                  </FormErrorMessage>
                )}
              </Flex>
              <Flex width={"100%"} justifyContent={"flex-end"}>
                <Button onClick={pushLobbyHander}>GO LOBBY</Button>
              </Flex>
            </FormControl>
          </Flex>
          <Flex
            w={{ base: "100%", md: "350px", xl: "600px" }}
            height="100%"
            borderRadius={"15px"}
            border="3px solid gray"
            boxShadow="dark-lg"
            rounded="md"
          >
            asdf
          </Flex>
        </Flex>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const roomId = context.query?.roomId;
  return {
    props: {
      roomId: roomId === undefined ? nanoid() : roomId,
      isCreater: roomId === undefined,
    },
  };
}
