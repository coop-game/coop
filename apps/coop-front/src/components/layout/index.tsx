import { Badge, Flex } from "@chakra-ui/react";
import { yjsGameState } from "@common/recoil/recoil.atom";
import Logo from "@components/Animation/Logo/Logo";
import SideMenuModal from "@components/Modal/SideMenuModal";
import { css } from "@emotion/react";
import { useTranslation } from "next-i18next";
import { useRecoilValue } from "recoil";

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
          justify-content: center;
          align-items: center;
        `}
      >
        <Flex
          w={{ base: "100%", md: "750px", xl: "1200px" }}
          css={css`
            justify-content: space-around;
            align-items: center;
            max-width: 1200px;
          `}
        >
          <div
            css={css`
              position: absolute;
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
            `}
          ></Flex>
          <Flex
            css={css`
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
              width: 40px;
              height: 40px;
              @media screen and (max-width: 600px) {
                transform: scale(0.8);
              }
            `}
          >
            <SideMenuModal></SideMenuModal>
          </Flex>
        </Flex>
        {children}
      </Flex>
      {/* <ToggleTheme></ToggleTheme> */}
    </Flex>
  );
};
export default Layout;
