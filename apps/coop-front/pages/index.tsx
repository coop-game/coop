import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import DraweeLogo from "@asset/images/DraweeLogo.png";
import lodashRandom from "lodash/random";
import { FormattedMessage } from "react-intl";

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
import { useRecoilState } from "recoil";
import AvatarImage from "@components/AvatarImage";
import { providerState } from "@common/yjsStore/userStore";
import getUtcTimeStamp from "@common/lib/getUtcTimeStamp";
import Layout from "@components/layout";
import LogoImage from "@components/layout/LogoImage";
import useHistoryBack from "@hooks/usehistoryBack";
import { css } from "@emotion/react";
import PostIt from "@components/layout/PostIt/PostIt";
import Description from "@components/Description/Description";

export default function Home({
  roomId,
  isCreater,
}: {
  roomId: string;
  isCreater: boolean;
}) {
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
    <Flex w={"100%"} h={"100%"} m={"10px"} ml={"20px"}>
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
          justifyContent={"center"}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: "10px", md: "20px" }}
        >
          <Flex
            w={{ base: "100%", md: "350px", xl: "600px" }}
            height="100%"
            rounded="md"
            // p={10}
            flexDirection={"column"}
            minHeight={"500px"}
            position="relative"
          >
            <PostIt>
              <Flex
                css={css`
                  height: 100%;
                  width: 100%;
                  flex-direction: column;
                  justify-content: space-between;
                  padding: 0 10% 10% 10%;
                  align-items: space-between;
                `}
              >
                <AvatarImage
                  avatarIndex={avatarIndex}
                  borderColor={color}
                  randomAvatarHandler={randomAvatarHandler}
                ></AvatarImage>
                <FormControl isInvalid={isError}>
                  <FormLabel>
                    <FormattedMessage
                      id="user.nickname"
                      values={{ locale: router.locale }}
                    ></FormattedMessage>
                  </FormLabel>
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
                        <FormattedMessage
                          id="user.success.nickname"
                          values={{ locale: router.locale }}
                        ></FormattedMessage>
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        <FormattedMessage
                          id="user.required.nickname"
                          values={{ locale: router.locale }}
                        ></FormattedMessage>
                      </FormErrorMessage>
                    )}
                  </Flex>
                  <Flex width={"100%"} justifyContent={"flex-end"}>
                    <Button onClick={pushLobbyHander}>GO LOBBY</Button>
                  </Flex>
                </FormControl>
                <div
                  css={css`
                    & {
                      position: absolute;
                      content: "";
                      top: -5px;
                      left: 0;
                      height: 10px;
                      width: 11px;
                      background-size: 9px 12px;
                      background-image: radial-gradient(
                        circle at 5% 40%,
                        transparent 70%,
                        #555 20%
                      );
                      transform: rotateX(90deg);
                    }
                  `}
                ></div>
              </Flex>
            </PostIt>
          </Flex>
          <Flex w={{ base: "100%", md: "350px", xl: "600px" }} height="100%">
            <PostIt>
              <div
                css={css`
                  width: 100%;
                  height: calc(100% - 200px);
                `}
              >
                <Description></Description>
              </div>
            </PostIt>
          </Flex>
        </Flex>
      </Layout>
    </Flex>
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
