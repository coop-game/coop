import { Flex } from "@chakra-ui/react";
import Copyright from "@components/layout/Footer/Copyright";
import { css } from "@emotion/react";
import Header from "./Header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      className="layout_main"
      w={"100%"}
      h={"100%"}
      p={{ base: "0em", md: "0em" }}
      justifyContent={"center"}
    >
      <Flex
        direction={{ base: "column" }}
        w={"100%"}
        h={"100%"}
        rounded={"md"}
        position={"relative"}
        css={css`
          @media screen and (max-width: 600px) {
            padding: 0px 5px 0px 5px;
          }
          max-width: 1200px;
          align-items: center;
        `}
      >
        <Header />
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
