import { Badge, Flex } from "@chakra-ui/react";
import { yjsGameState } from "@common/recoil/recoil.atom";
import Logo from "@components/Animation/Logo/Logo";
import LanguageButton from "@components/Button/LanguageButton";
import Copyright from "@components/Copyright";
import ChattingModal from "@components/Modal/ChattingModal";
import SideMenuModal from "@components/Modal/SideMenuModal";
import { css } from "@emotion/react";
import { useTranslation } from "next-i18next";
import { useRecoilValue } from "recoil";
import BackgroundNote from "./backgroundNote";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const gameState = useRecoilValue(yjsGameState);
  const { t } = useTranslation("common");

  return (
    <Flex
      className="layout_main"
      w={"100%"}
      h={"100%"}
      p={{ base: "0em", md: "0em" }}
      css={css`
        justify-content: center;
      `}
    >
      <Flex
        direction={{ base: "column" }}
        w={"100%"}
        h={"100%"}
        rounded="md"
        position="relative"
        css={css`
          @media screen and (max-width: 600px) {
            padding: 0px 5px 0px 5px;
          }
          max-width: 1200px;
          align-items: center;
        `}
      >
        <Flex
          w={{ base: "100%", md: "750px", xl: "1000px" }}
          css={css`
            width: 100%;
            justify-content: space-around;
            align-items: center;
            max-width: 1200px;
            position: relative;
          `}
        >
          <div
            css={css`
              position: absolute;
              bottom: 0%;
              left: 3%;
            `}
          >
            {gameState &&
              gameState.isGameStart &&
              (gameState.gameType === "DRAWEE" ? (
                <Badge>{"Drawee"}</Badge>
              ) : (
                <Badge>{t("lobby.relay.race.game.title")}</Badge>
              ))}
          </div>
          <Flex
            css={css`
              margin-left: 80px;
              @media screen and (max-width: 600px) {
                margin-left: 0px;
              }
            `}
          ></Flex>
          <Flex
            css={css`
              position: relative;
              flex-grow: 1;
              height: 130px;
              @media screen and (max-width: 600px) {
                height: 70px;
                transform-origin: 50% 10%;
                transform: scale(0.5);
              }
            `}
          >
            <Logo color={"#721480"}></Logo>
          </Flex>
          <Flex
            css={css`
              flex-grow: 0;
              flex-basis: 40px;
              margin-right: 40px;
              width: 100px;
              height: 40px;
              gap: 20px;
              @media screen and (max-width: 600px) {
                position: absolute;
                right: -50px;
                top: 15px;
                transform: scale(0.8);
              }
            `}
          >
            <ChattingModal></ChattingModal>
            <SideMenuModal></SideMenuModal>
          </Flex>
        </Flex>
        <div
          css={css`
            width: 100%;
            height: 100%;
            overflow: hidden scroll;
          `}
        >
          {children}
        </div>
        <Copyright />
      </Flex>
    </Flex>
  );
};
export default Layout;
