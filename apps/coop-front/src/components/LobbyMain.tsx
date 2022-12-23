import DraweeLogo from "@asset/images/DraweeLogo.png";
import Image from "next/image";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import Users from "@components/Users";
import { userProfilesSelector, userSelector } from "@common/recoil/recoil.atom";
import { useTranslation } from "@hooks/useTransitions";
import { useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Chatting from "./Chatting";
import useProfileUpdate from "@hooks/useProfileUpdate";
import useCheckCreatedProvider from "@hooks/useCheckCreatedProvider";
import { css } from "@emotion/react";
import useSyncPageFromGameState from "@hooks/useSyncPageFromGameState";
import {
  getChangeGameStateHandler,
  providerState,
} from "@common/yjsStore/userStore";
import { DEFAULT_GAME_STATE } from "src/constant/games";
import useUpdateGameState from "@hooks/useUpdateGameState";

export const LobbyMain = () => {
  const translation = useTranslation("ko-kr").messages;
  const toast = useToast();
  useCheckCreatedProvider(
    "/ErrorPage/?errorMessage=잘못된 접근입니다.&statusCode=403"
  );
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const { provider } = providerState;
  useUpdateGameState(roomId);
  useSyncPageFromGameState();
  const changeGameStateHandler = getChangeGameStateHandler(roomId);
  useProfileUpdate();

  if (provider === null) {
    return <div></div>;
  }

  const onClickInviteHandler = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/?roomId=${roomId}`
    );
    toast({
      title: "초대하기",
      description: "초대주소가 복사되었습니다.",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const onClickGameStartHandler = () => {
    changeGameStateHandler({
      isGameStart: true,
      gamePages: DEFAULT_GAME_STATE.DRAWEE.gamePages,
      gamePagesIndex: DEFAULT_GAME_STATE.DRAWEE.gamePagesIndex,
    });
  };

  return (
    <Flex w={"100%"} h={"100vh"} alignItems={"center"} p={"3em"}>
      <Flex
        direction={{ base: "column" }}
        alignItems={"center"}
        w={"100%"}
        h={"100%"}
        border="3px solid gray"
        boxShadow="dark-lg"
        rounded="md"
      >
        <Flex
          position={"absolute"}
          m={5}
          height={"150px"}
          width={"100%"}
          justifyContent={"center"}
        >
          <Image src={DraweeLogo} width={150} height={150} alt="로고이미지" />
        </Flex>
        <Flex
          w={"100%"}
          h={"100%"}
          p="3em"
          pt={"198px"}
          justifyContent={"center"}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: "10px", md: "20px" }}
        >
          <Users userProfiles={userProfiles} />
          <Flex
            w={{ base: "100%", md: "350px", xl: "600px" }}
            height="100%"
            borderRadius={"15px"}
            border="3px solid gray"
            boxShadow="dark-lg"
            rounded="md"
            flexDirection={"column"}
          >
            <Flex
              css={css`
                flex-grow: 3;
                overflow: hidden;
              `}
            >
              <Chatting></Chatting>
            </Flex>
            {!isOwner && (
              <div>
                <Spinner color="red.500" />
                방장이 선택하는 중입니다.
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
      </Flex>
    </Flex>
  );
};
export default LobbyMain;
