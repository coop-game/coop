import { Box, Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
import GithubButton from "../../Button/GithubButton";

const Copyright = () => {
  return (
    <Flex
      css={css`
        width: 100%;
        height: 50px;
        user-select: none;
        justify-content: center;
        align-items: center;
        gap: 10px;
      `}
    >
      <Flex>ⓒ 2023 StaryPlayUp. All rights Reserved.</Flex>
      <GithubButton />
    </Flex>
  );
};
export default Copyright;
