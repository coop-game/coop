import { Box, Button, Flex, Input, useColorMode } from "@chakra-ui/react";
import { ChattingSelector, userSelector } from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import { css } from "@emotion/react";
import useChattingUpdate from "@hooks/gameHooks/gameChatting/useChattingUpdate";
import React from "react";
import { useRecoilValue } from "recoil";
import { useTranslation } from "next-i18next";

const Chatting = () => {
  const { t } = useTranslation("common");
  const chattingState = useRecoilValue(ChattingSelector);
  const { inputString, setInputString, messagesEndRef, onClickHandler } =
    useChattingUpdate();
  const { colorMode } = useColorMode();
  const chattingInputPlaceholder = t("chatting.input.placeholder");

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  return (
    <Flex
      // maxHeight={{ base: 500, md: 900 }}
      css={css`
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
      `}
    >
      <Flex
        backgroundColor={colorMode === "light" ? "#ece6cc" : "#a59a6b"}
        css={css`
          flex-direction: column;
          word-break: break-all;
          overflow-y: scroll;
          height: 100%;
          border-radius: 8px;
        `}
      >
        {chattingState.map(({ nickname, message, id }, idx) => {
          return (
            <div
              key={nickname + idx}
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
        })}
        <div ref={messagesEndRef}></div>
      </Flex>
      <Box
        css={css`
          display: flex;
          gap: 3px;
          padding: 3px;
        `}
        borderRadius="8px"
        backgroundColor={colorMode === "light" ? "#fffceb" : "#232323"}
      >
        <Input
          css={css`
            flex-grow: 1;
          `}
          placeholder={chattingInputPlaceholder}
          value={inputString}
          onChange={(e) => {
            setInputString(e.target.value.substring(0, 50));
          }}
          onKeyPress={onKeyPressHandler}
        />
        <Button onClick={onClickHandler}>{t("chatting.input")}</Button>
      </Box>
    </Flex>
  );
};
export default Chatting;
