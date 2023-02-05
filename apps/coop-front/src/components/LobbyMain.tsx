import { css } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";

import {
  userProfilesSelector,
  userSelector,
  yjsQuestionsState,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import { useRecoilState, useRecoilValue } from "recoil";

import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useCheckCreatedProvider from "@hooks/pageMove/useCheckCreatedProvider";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";

import {
  doc,
  getChangeGameStateHandler,
  providerState,
  yAgreeState,
  yChattingState,
  yGameState,
  yQuestionsState,
  yRelayRaceAnswerState,
} from "@common/yjsStore/userStore";

import DraweeLogo from "@asset/images/DraweeLogo.png";
import Users from "@components/Users";
import Chatting from "./Chat/Chatting";

import { useEffect, useState } from "react";
import {
  CPGameDrawee,
  CPGameRelayRace,
  CPGameState,
  CPGameTypes,
} from "@types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { motion } from "framer-motion";
import ShakeAnimation from "./Animation/ShakeAnimation";

export const LobbyMain = () => {
  const { t } = useTranslation("common");
  const lobbyToastInviteTitle = t("lobby.toast.invite.title");
  const lobbyToastInviteDescription = t("lobby.toast.invite.description");
  const router = useRouter();
  const toast = useToast();
  useCheckCreatedProvider(
    "/ErrorPage/?errorMessage=잘못된 접근입니다.&statusCode=403"
  );
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const { provider } = providerState;
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();
  const changeGameStateHandler = getChangeGameStateHandler<CPGameState>(roomId);
  const [_, setRelayraceAnswerState] = useRecoilState(yjsRelayRaceAnswerState);
  useProfileUpdate();
  const { colorMode } = useColorMode();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // 로비로 진입시 questionsState, yAgreeState 를 초기화함.
    if (isOwner) {
      const gameState = yGameState.get(roomId);
      if (!gameState) return;
      const pageIndex = gameState.gamePagesIndex;
      doc.transact(() => {
        for (let index = 0; index <= pageIndex; index++) {
          doc.getMap<any>(`shapes ${index}`).clear();
          doc.getMap<any>(`bindings ${index}`).clear();
        }
        yChattingState.delete(0, yChattingState.length);
        yQuestionsState.delete(0, yQuestionsState.length);
        yRelayRaceAnswerState.delete(0, yRelayRaceAnswerState.length);
        yAgreeState.clear();
      });
    }
    // 나중에 결과 페이지에서 처리
    setRelayraceAnswerState([]);
  }, [isOwner, roomId]);

  if (provider === null) {
    return <div>프로바이더가 없음</div>;
  }

  const onClickInviteHandler = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/?roomId=${roomId}`
    );
    toast({
      title: lobbyToastInviteTitle,
      description: lobbyToastInviteDescription,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const onClickGameStartHandler = (gameType: CPGameTypes) => {
    if (gameType === "DRAWEE") {
      const partialDrawee: Partial<CPGameDrawee> = {
        isGameStart: true,
        gamePagesIndex: 0,
        gameType: "DRAWEE",
        path: "/start",
      };
      changeGameStateHandler(partialDrawee);
    }

    if (gameType === "RELAY_RACE") {
      const partialRelayRace: Partial<CPGameRelayRace> = {
        isGameStart: true,
        gamePagesIndex: 0,
        gameType: "RELAY_RACE",
        path: "/games/relay-race",
      };
      changeGameStateHandler(partialRelayRace);
    }
  };

  const imageSrcArray = [
    { src: "/images/svg/game-control.svg", alt: "setting" },
    { src: "/images/svg/message.svg", alt: "message" },
  ];

  return (
    <>
      <Flex
        w={"100%"}
        h={"100%"}
        minHeight={"500px"}
        p="1em"
        justifyContent={"center"}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "10px", md: "20px" }}
      >
        <Flex w={{ base: "100%", md: "250px", xl: "350px" }} h="100%">
          <Users userProfiles={userProfiles} />
        </Flex>
        <Flex
          w={{ base: "100%", md: "600px", xl: "600px" }}
          h={{ base: "70%", sm: "80%", md: "100%" }}
          borderRadius={"15px"}
          // border="3px solid gray"
          boxShadow="dark-lg"
          rounded="md"
          // flexDirection={"column"}
        >
          <Tabs
            w="100%"
            h="100%"
            // display={"flex"}
            // flexDirection="column"
            size={"md"}
            isFitted
            variant={"enclosed"}
            colorScheme={"white"}
            isLazy
            onChange={(idx) => {
              setSelectedTab(idx);
            }}
          >
            <TabList>
              {imageSrcArray.map(({ src, alt }, idx) => {
                return (
                  <Tab key={src} _selected={{ bg: "#C5DEDA" }}>
                    {selectedTab === idx ? (
                      <ShakeAnimation>
                        <Image width={30} height={30} src={src} alt={alt} />
                      </ShakeAnimation>
                    ) : (
                      <Image width={30} height={30} src={src} alt={alt} />
                    )}
                  </Tab>
                );
              })}
            </TabList>
            <TabPanels display={"flex"} w="100%" h="95%">
              <TabPanel w="100%" h="100%">
                {!isOwner && (
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    m={3}
                    gap={"10px"}
                    fontWeight={500}
                    fontSize={"1.1rem"}
                  >
                    <Spinner color="red.500" size="md" />
                  </Flex>
                )}
                {isOwner && (
                  // <Flex
                  //   css={css`
                  //     flex-grow: 1;
                  //     max-height: 45px;
                  //     width: 100%;
                  //     justify-content: space-between;
                  //   `}
                  // >
                  //   <Button
                  //     css={css`
                  //       width: 50%;
                  //     `}
                  //     onClick={onClickInviteHandler}
                  //   >
                  //     {t("lobby.invite.button")}
                  //   </Button>
                  //   <Button
                  //     css={css`
                  //       width: 50%;
                  //     `}
                  //     onClick={() => onClickGameStartHandler("DRAWEE")}
                  //   >
                  //     {t("lobby.next.button")}1
                  //   </Button>
                  //   <Button
                  //     css={css`
                  //       width: 50%;
                  //     `}
                  //     onClick={() => onClickGameStartHandler("RELAY_RACE")}
                  //   >
                  //     {t("lobby.next.button")}2
                  //   </Button>
                  // </Flex>
                  <SimpleGrid
                    paddingTop={"3%"}
                    paddingBottom={"3%"}
                    w="100%"
                    h="100%"
                    overflowY="scroll"
                    spacing={2}
                    templateColumns="reqeat(auto-fill,minmax(250px,1fr))"
                  >
                    <Box w={{ sm: "100%", md: "250px" }}>
                      <Button
                        maxW="400px"
                        w={{ sm: "100%", md: "225px" }}
                        h="50px"
                        onClick={onClickInviteHandler}
                      >
                        <svg
                          fill="#000000"
                          viewBox="0 0 80 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M8 6.1a.31.31 0 0 0-.45.32 2.47 2.47 0 0 0 .51 1.22l.15.13A3 3 0 0 1 9.08 10a3.63 3.63 0 0 1-3.55 3.44 3 3 0 0 1-2.11-.85 3 3 0 0 1-.85-2.22A3.55 3.55 0 0 1 3.63 8a3.66 3.66 0 0 1 1.5-.91A5.19 5.19 0 0 1 5 6v-.16a4.84 4.84 0 0 0-2.31 1.3 4.5 4.5 0 0 0-.2 6.37 4.16 4.16 0 0 0 3 1.22 4.79 4.79 0 0 0 3.38-1.42 4.52 4.52 0 0 0 .21-6.38A4.16 4.16 0 0 0 8 6.1z"></path>
                            <path d="M13.46 2.54a4.16 4.16 0 0 0-3-1.22 4.79 4.79 0 0 0-3.37 1.42 4.52 4.52 0 0 0-.21 6.38A4.21 4.21 0 0 0 8 9.9a.31.31 0 0 0 .45-.31 2.41 2.41 0 0 0-.52-1.23l-.15-.13A3 3 0 0 1 6.92 6a3.63 3.63 0 0 1 3.55-3.44 3 3 0 0 1 2.11.85 3 3 0 0 1 .85 2.22A3.55 3.55 0 0 1 12.37 8a3.66 3.66 0 0 1-1.5.91 5.19 5.19 0 0 1 .13 1.14v.16a4.84 4.84 0 0 0 2.31-1.3 4.5 4.5 0 0 0 .15-6.37z"></path>
                          </g>
                        </svg>
                        {t("lobby.invite.button")}
                      </Button>
                    </Box>
                    <Card align={"center"}>
                      <CardHeader>
                        <Text fontWeight={"extrabold"} fontSize={"2xl"}>
                          Drawee
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <Text>{t("lobby.drawee.information")}</Text>
                      </CardBody>
                      <CardFooter>
                        <Button
                          onClick={() => onClickGameStartHandler("DRAWEE")}
                        >
                          {t("lobby.next.button")}
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card align={"center"}>
                      <CardHeader fontWeight={"extrabold"} fontSize={"2xl"}>
                        {t("lobby.relay.race.game.title")}
                      </CardHeader>
                      <CardBody>
                        <Text>{t("lobby.relay.race.information")}</Text>
                      </CardBody>
                      <CardFooter>
                        <Button
                          onClick={() => onClickGameStartHandler("RELAY_RACE")}
                        >
                          {t("lobby.next.button")}
                        </Button>
                      </CardFooter>
                    </Card>
                  </SimpleGrid>
                )}
              </TabPanel>
              <TabPanel display={"flex"} w="100%" h="100%">
                <Flex
                  css={css`
                    flex-grow: 1;
                    overflow: hidden;
                  `}
                >
                  <Chatting></Chatting>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};

export default LobbyMain;
