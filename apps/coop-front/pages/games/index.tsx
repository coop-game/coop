import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import lodashRandom from "lodash/random";

import {
  Box,
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
import AvatarImage from "@components/Users/AvatarImage";
import { providerState } from "@common/yjsStore/userStore";
import getUtcTimeStamp from "@common/lib/getUtcTimeStamp";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import { css } from "@emotion/react";
import PostIt from "@components/layout/PostIt/PostIt";
import Description from "@components/Game/common/Description";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next/types";
import { NextSeo } from "next-seo";

const URL = process.env.NEXT_PUBLIC_HOSTNAME || "http://localhost:3001";

export default function Home({
  roomId,
  isCreater,
}: {
  roomId: string;
  isCreater: boolean;
}) {
  const { t } = useTranslation("common");
  const [_, setUserState] = useRecoilState(userSelector);
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [isError, setIsError] = useState(true);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [color, setColor] = useState("#000000");

  const backgroundAudioRef = useRef(null);

  const getRandomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  const randomAvatarHandler = useCallback(() => {
    setAvatarIndex(lodashRandom(9));
    setColor(getRandomColor());
  }, []);

  useHistoryBack();

  const pushLobbyHander = () => {
    if (nickname.length > 0 && nickname.length <= 15) {
      providerState.clearProvider();
      providerState.createProvider(roomId);
      const utcTimeStamp = getUtcTimeStamp();
      setUserState({ roomId, nickname, avatarIndex, color, utcTimeStamp });
      backgroundAudioRef.current && backgroundAudioRef.current.play();
      router.push("/games/lobby");
    } else {
      setIsError(true);
    }
  };

  const onChangeNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    if (newNickname.length >= 0 && newNickname.length <= 15) {
      setNickname(newNickname);
    }
    if (newNickname.length === 0) {
      setIsError(true);
    }
  };

  useEffect(() => {
    backgroundAudioRef.current = document.getElementById(
      "background_audio"
    ) as HTMLAudioElement | null;
  }, []);

  return (
    <>
      <NextSeo
        title={t("seo.games.main.title")}
        description={t("seo.games.main.description")}
        openGraph={{
          url: URL,
          title: t("seo.games.main.title"),
          description: t("seo.games.main.description"),
          images: [
            {
              url: `/images/logo.png`,
              width: 397,
              height: 156,
              alt: t("seo.games.main.opengraph.images.alt"),
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Layout>
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
                  <FormLabel
                    display={"flex"}
                    gap={"10px"}
                    justifyContent={"space-between"}
                  >
                    <Flex fontSize={"1.3rem"} fontWeight={5000}>
                      {t("user.nickname")}
                    </Flex>
                    <Flex
                      fontSize={"0.8rem"}
                      justifyContent={"center"}
                      alignItems={"flex-end"}
                    >
                      {t("user.nickname.description")}
                    </Flex>
                  </FormLabel>
                  <Input
                    type="email"
                    value={nickname}
                    onChange={onChangeNicknameHandler}
                  />
                  <Flex ml={5}>
                    {!isError ? (
                      <FormHelperText>
                        {t("user.success.nickname")}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        {t("user.required.nickname")}
                      </FormErrorMessage>
                    )}
                  </Flex>
                  <Flex width={"100%"} justifyContent={"flex-end"}>
                    <Button boxShadow={"base"} onClick={pushLobbyHander}>
                      GO LOBBY
                    </Button>
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
          <Flex
            display={{ base: "none", md: "flex" }}
            w={{ base: "100%", md: "350px", xl: "600px" }}
            height="100%"
          >
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const roomId = context.query?.roomId;
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "ko", ["common"])),
      roomId: roomId === undefined ? nanoid() : roomId,
      isCreater: roomId === undefined,
    },
  };
};
