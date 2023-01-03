import DraweeLogo from "@asset/images/DraweeLogo.png";
import Image from "next/image";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import Users from "@components/Users";
import {
  userProfilesSelector,
  userSelector,
  yjsGameState,
} from "@common/recoil/recoil.atom";
import { useTranslation } from "@hooks/useTransitions";
import { useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Chatting from "./Chatting";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useCheckCreatedProvider from "@hooks/pageMove/useCheckCreatedProvider";
import { css } from "@emotion/react";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import {
  getChangeGameStateHandler,
  providerState,
  yQuestionsState,
} from "@common/yjsStore/userStore";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import LogoImage from "./layout/LogoImage";
import { useRouter } from "next/router";
import { CPGameDrawee, CPGameRelayRace, CPGameState } from "@types";

export const LobbyMain = () => {
  const router = useRouter();
  const translation = useTranslation().messages;
  const toast = useToast();
  useCheckCreatedProvider(
    "/ErrorPage/?errorMessage=잘못된 접근입니다.&statusCode=403"
  );
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const gameState = useRecoilValue(yjsGameState);
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const { provider } = providerState;
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();
  const changeGameStateHandler = getChangeGameStateHandler<CPGameState>(roomId);
  useProfileUpdate();

  if (provider === null) {
    return <div></div>;
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

  const onClickGameStartHandler = () => {
    // yQuestionsState.delete();
    changeGameStateHandler({
      isGameStart: true,
      path: "/games/relay-race",
    } as CPGameRelayRace);
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
            <div>
              <Spinner color="red.500" />
              {translation["lobby.selectByOwner"]}
            </div>
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
                onClick={onClickGameStartHandler}
              >
                {translation["lobby.next.button"]}
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default LobbyMain;
