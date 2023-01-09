import { css } from "@emotion/react";
import { Button, Flex, Spinner, useToast } from "@chakra-ui/react";

import { userProfilesSelector, userSelector } from "@common/recoil/recoil.atom";
import { useTranslation } from "@hooks/useTransitions";
import { useRecoilValue } from "recoil";

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
} from "@common/yjsStore/userStore";

import DraweeLogo from "@asset/images/DraweeLogo.png";
import Users from "@components/Users";
import Chatting from "./Chatting";
import LogoImage from "./layout/LogoImage";

import { useEffect } from "react";
import {
  CPGameDrawee,
  CPGameRelayRace,
  CPGameState,
  CPGameTypes,
} from "@types";

export const LobbyMain = () => {
  const translation = useTranslation().messages;
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
  useProfileUpdate();

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
        yAgreeState.clear();
      });
    }
  }, [isOwner, roomId]);

  if (provider === null) {
    return <div>프로바이더가 없음</div>;
  }

  const onClickInviteHandler = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/?roomId=${roomId}`
    );
    toast({
      title: translation["lobby.toast.invite.title"],
      description: translation["lobby.toast.invite.description"],
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
        path: "/start",
      };
      changeGameStateHandler(partialDrawee);
    }

    if (gameType === "RELAY_RACE") {
      changeGameStateHandler({
        isGameStart: true,
        path: "/games/relay-race",
      } as CPGameRelayRace);
    }
  };

  return (
    <>
      <LogoImage src={DraweeLogo} height={150} width={150} heightPadding={25} />
      <Flex
        w={"100%"}
        h={"100%"}
        minHeight={"500px"}
        p="1em"
        justifyContent={"center"}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "10px", md: "20px" }}
      >
        <div
          css={css`
            minheight: 200px;
          `}
        >
          <Users userProfiles={userProfiles} />
        </div>
        <Flex
          w={{ base: "100%", md: "350px", xl: "600px" }}
          h={"100%"}
          css={css``}
          borderRadius={"15px"}
          border="3px solid gray"
          boxShadow="dark-lg"
          rounded="md"
          flexDirection={"column"}
        >
          <Flex
            css={css`
              flex-grow: 1;
              overflow: hidden;
            `}
          >
            <Chatting></Chatting>
          </Flex>

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
              {translation["lobby.select.by.owner"]}
            </Flex>
          )}
          {isOwner && (
            <Flex
              css={css`
                flex-grow: 1;
                max-height: 45px;
                width: 100%;
                justify-content: space-between;
              `}
            >
              <Button
                css={css`
                  width: 50%;
                `}
                onClick={onClickInviteHandler}
              >
                {translation["lobby.invite.button"]}
              </Button>
              <Button
                css={css`
                  width: 50%;
                `}
                onClick={() => onClickGameStartHandler("DRAWEE")}
              >
                {translation["lobby.next.button"]}1
              </Button>
              <Button
                css={css`
                  width: 50%;
                `}
                onClick={() => onClickGameStartHandler("RELAY_RACE")}
              >
                {translation["lobby.next.button"]}2
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default LobbyMain;
