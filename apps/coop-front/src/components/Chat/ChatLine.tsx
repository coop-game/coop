/** @jsxImportSource @emotion/react */
import { Box, useColorMode } from "@chakra-ui/react";
import { providerState } from "@common/yjsStore/userStore";
import { css } from "@emotion/react";
import { CPChatType } from "@types";
import { id } from "lib0/function";

const ChatLine = ({ nickname, message, id }: CPChatType) => {
  const { colorMode } = useColorMode();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: ${providerState.provider.awareness.clientID === id
          ? "flex-end"
          : "flex-start"};
        padding: 10px;
      `}
    >
      {providerState.provider.awareness.clientID !== id && (
        <div
          css={css`
            font-size: 1.3rem;
          `}
        >
          {nickname}
        </div>
      )}
      {/*  f5e6a4*/}
      <Box
        backgroundColor={colorMode === "light" ? "#d4c78c" : "#131933"}
        css={css`
          font-size: 1.1rem;
          padding: 5px;
          border-radius: 8px;
        `}
      >
        {message}
      </Box>
    </div>
  );
};
export default ChatLine;
