import { Button, Flex, Input } from "@chakra-ui/react";
import { ChattingSelector, userSelector } from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import { css } from "@emotion/react";
import useChattingUpdate from "@hooks/gameHooks/gameChatting/useChattingUpdate";
import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Chatting = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const chattingState = useRecoilValue(ChattingSelector);
  const { inputString, setInputString, messagesEndRef, onClickHandler } =
    useChattingUpdate();

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
        css={css`
          flex-direction: column;
          word-break: break-all;
          overflow-y: scroll;
          height: 100%;
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
              <div
                css={css`
                  background: #00eaff;
                  font-size: 1.1rem;
                  padding: 5px;
                  border-radius: 8px;
                `}
              >
                {message}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </Flex>
      <div
        css={css`
          display: flex;
          gap: 3px;
          padding: 3px;
        `}
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
      </div>
    </Flex>
  );
};
export default Chatting;
