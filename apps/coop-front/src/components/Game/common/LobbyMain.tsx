import { css } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Highlight,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";

import {
  userProfilesSelector,
  userSelector,
  yjsRelayRaceAnswerState,
  yjsSelectGameType,
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
  ySelectGameType,
} from "@common/yjsStore/userStore";

import Users from "@components/Users";
import Chatting from "../../Chat/Chatting";

import { useEffect, useState } from "react";
import {
  CPGameDrawee,
  CPGameRelayRace,
  CPGameState,
  CPGameTypes,
} from "@types";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import ShakeAnimation from "../../Animation/ShakeAnimation";
import DraweeInformationAnimation from "../../Animation/GameInformation/Drawee";
import RelayRaceInformationAnimation from "../../Animation/GameInformation/RelayRace";
import LinkSVG from "@asset/LinkSVG";
import useGameSelector from "@hooks/gameHooks/updateState/useGameSelector";

export const LobbyMain = () => {
  const { t } = useTranslation("common");
  const lobbyToastInviteTitle = t("lobby.toast.invite.title");
  const lobbyToastInviteDescription = t("lobby.toast.invite.description");
  const toast = useToast();
  useCheckCreatedProvider("/games/ErrorPage/?statusCode=403");
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const { provider } = providerState;
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();
  const changeGameStateHandler = getChangeGameStateHandler<CPGameState>(roomId);
  const [_, setRelayraceAnswerState] = useRecoilState(yjsRelayRaceAnswerState);
  useProfileUpdate();
  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedGame, setSelectedGame] = useState<number>(-1);
  const selectGameType = useRecoilValue(yjsSelectGameType);
  useGameSelector();
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
        ySelectGameType.set("gameIndex", 0);
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
      `${process.env.NEXT_PUBLIC_HOSTNAME}/games/?roomId=${roomId}`
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
        path: "/games/drawee/start",
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
        <Flex
          w={{ base: "100%", md: "250px", xl: "350px" }}
          h={{ base: "80px", md: "100%" }}
        >
          <Users userProfiles={userProfiles} />
        </Flex>
        <Flex
          w={{ base: "100%", md: "600px", xl: "600px" }}
          h={{ base: "70%", sm: "80%", md: "100%" }}
          borderRadius={"15px"}
          boxShadow="dark-lg"
          rounded="md"
        >
          <Tabs
            w="100%"
            h="100%"
            size={"md"}
            isFitted
            variant={"enclosed"}
            colorScheme={"white"}
            isLazy
            onChange={(idx) => {
              setSelectedTab(idx);
            }}
          >
            <TabList h={50}>
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
            <TabPanels display={"flex"} w="100%" h={"calc(100% - 50px)"}>
              <TabPanel w="100%" h="100%">
                <Flex
                  paddingTop={"3%"}
                  flexDirection="column"
                  paddingBottom={"3%"}
                  w="100%"
                  h="100%"
                  overflowY="scroll"
                  // templateColumns="reqeat(auto-fill,minmax(100px,1fr))"
                >
                  <Box w={{ sm: "100%", md: "250px" }} marginBottom="3%">
                    <Button
                      maxW="400px"
                      w={{ sm: "100%", md: "225px" }}
                      h="50px"
                      onClick={onClickInviteHandler}
                    >
                      <LinkSVG />
                      {t("lobby.invite.button")}
                    </Button>
                  </Box>
                  <Card align={"center"} marginBottom="3%">
                    <CardHeader
                      onClick={() => {
                        if (isOwner) {
                          ySelectGameType.set("gameIndex", 0);
                        }
                        setSelectedGame(0);
                      }}
                      css={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        :hover {
                          cursor: pointer;
                        }
                      `}
                    >
                      {selectGameType === 0 && (
                        <Text position="absolute" left="5%">
                          <Highlight
                            query={t("lobby.game.selected")}
                            styles={{
                              px: "2",
                              py: "1",
                              rounded: "full",
                              bg: "red.100",
                            }}
                          >
                            {t("lobby.game.selected")}
                          </Highlight>
                        </Text>
                      )}

                      <Text fontWeight={"extrabold"} fontSize={"2xl"}>
                        Drawee
                      </Text>
                    </CardHeader>

                    <Flex
                      w="100%"
                      h={selectedGame === 0 ? "300px" : "0px"}
                      overflow="hidden"
                      flexDirection={"column"}
                      justifyContent="center"
                      alignItems={"center"}
                      css={css`
                        transition-duration: 500ms;
                        transition-timing-function: ease-in-out;
                      `}
                    >
                      <CardBody>
                        <Box w="100%" h="90%">
                          <DraweeInformationAnimation />
                        </Box>
                        <Text>{t("lobby.drawee.information")}</Text>
                      </CardBody>
                      <CardFooter>
                        {isOwner && (
                          <Button
                            onClick={() => onClickGameStartHandler("DRAWEE")}
                          >
                            {t("lobby.next.button")}
                          </Button>
                        )}
                      </CardFooter>
                    </Flex>
                  </Card>
                  <Card align={"center"}>
                    <CardHeader
                      onClick={() => {
                        if (isOwner) {
                          ySelectGameType.set("gameIndex", 1);
                        }
                        setSelectedGame(1);
                      }}
                      css={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        :hover {
                          cursor: pointer;
                        }
                      `}
                    >
                      {selectGameType === 1 && (
                        <Text position="absolute" left="5%">
                          <Highlight
                            query={t("lobby.game.selected")}
                            styles={{
                              px: "2",
                              py: "1",
                              rounded: "full",
                              bg: "red.100",
                            }}
                          >
                            {t("lobby.game.selected")}
                          </Highlight>
                        </Text>
                      )}
                      <Text fontWeight={"extrabold"} fontSize={"2xl"}>
                        {t("lobby.relay.race.game.title")}
                      </Text>
                    </CardHeader>
                    <Flex
                      w="100%"
                      h={selectedGame === 1 ? "300px" : "0px"}
                      overflow="hidden"
                      flexDirection={"column"}
                      justifyContent="center"
                      alignItems={"center"}
                      css={css`
                        transition-duration: 500ms;
                        transition-timing-function: ease-in-out;
                      `}
                    >
                      <CardBody>
                        <Box w="100%" h="90%">
                          <RelayRaceInformationAnimation />
                        </Box>
                        <Text>{t("lobby.relay.race.information")}</Text>
                      </CardBody>
                      <CardFooter>
                        {isOwner && (
                          <Button
                            onClick={() =>
                              onClickGameStartHandler("RELAY_RACE")
                            }
                          >
                            {t("lobby.next.button")}
                          </Button>
                        )}
                      </CardFooter>
                    </Flex>
                  </Card>
                </Flex>
              </TabPanel>
              <TabPanel display={"flex"} w="100%" h="100%">
                <Chatting></Chatting>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};

export default LobbyMain;
