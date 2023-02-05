import { Flex } from "@chakra-ui/react";
import Logo from "@components/Animation/Logo/Logo";
import MuteButton from "@components/Sound/MuteButton";
import ToggleTheme from "@components/ToggleTheme";
import { css } from "@emotion/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 130px;
            @media screen and (max-width: 600px) {
              /* display: none; */
              height: 70px;
              transform: scale(0.5);
            }
            /* transform-origin: 2% 0%; */
          `}
        >
          {/* <Logo color={"#711480b1"}></Logo> */}
          <Logo color={"#721480"}></Logo>
        </div>
        <div
          css={css`
            position: absolute;
            right: 30px;
            top: 30px;
            @media screen and (max-width: 600px) {
              /* display: none; */
              top: 20px;
              transform: scale(0.8);
            }
          `}
        >
          <MuteButton></MuteButton>
        </div>
        {children}
      </Flex>
      {/* <ToggleTheme></ToggleTheme> */}
    </Flex>
  );
};
export default Layout;
