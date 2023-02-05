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

import Users from "@components/Users";
import Chatting from "./Chat/Chatting";

import { useEffect } from "react";
import {
  CPGameDrawee,
  CPGameRelayRace,
  CPGameState,
  CPGameTypes,
} from "@types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import DraweeInformationAnimation from "./Animation/GameInformation/Drawee";
import RelayRaceInformationAnimation from "./Animation/GameInformation/RelayRace";
import LinkSVG from "@asset/LinkSVG";

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
            isLazy
          >
            <TabList>
              <Tab>게임</Tab>
              <Tab>채팅</Tab>
            </TabList>
            <TabPanels display={"flex"} w="100%" h="95%">
              <TabPanel w="100%" h="100%">
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
                      <LinkSVG />
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
                  </Card>
                  <Card align={"center"}>
                    <CardHeader fontWeight={"extrabold"} fontSize={"2xl"}>
                      {t("lobby.relay.race.game.title")}
                    </CardHeader>
                    <CardBody>
                      <Box w="100%" h="90%">
                        <RelayRaceInformationAnimation />
                      </Box>
                      <Text>{t("lobby.relay.race.information")}</Text>
                    </CardBody>
                    <CardFooter>
                      {isOwner && (
                        <Button
                          onClick={() => onClickGameStartHandler("RELAY_RACE")}
                        >
                          {t("lobby.next.button")}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </SimpleGrid>
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
