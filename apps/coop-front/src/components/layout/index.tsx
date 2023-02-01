import { Flex } from "@chakra-ui/react";
import Logo from "@components/Animation/Logo/Logo";
import ToggleTheme from "@components/ToggleTheme";
import { css } from "@emotion/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      className="layout_main"
      w={"100%"}
      h={"100%"}
      p={{ base: "0em", md: "0em" }}
    >
      <Flex
        direction={{ base: "column" }}
        w={"100%"}
        h={"100%"}
        rounded="md"
        position="relative"
      >
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 140px;
          `}
        >
          {/* <Logo color={"#711480b1"}></Logo> */}
          <Logo color={"#721480"}></Logo>
        </div>
        {children}
      </Flex>
      <ToggleTheme></ToggleTheme>
    </Flex>
  );
};
export default Layout;
