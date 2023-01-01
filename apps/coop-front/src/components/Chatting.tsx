import { Button, Flex, Input } from "@chakra-ui/react";
import { ChattingSelector, userSelector } from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import { css } from "@emotion/react";
import useChattingUpdate from "@hooks/gameHooks/gameChatting/useChattingUpdate";
import { useTranslation } from "@hooks/useTransitions";
import React from "react";
import { useRecoilValue } from "recoil";

const Chatting = () => {
  const chattingState = useRecoilValue(ChattingSelector);
  const { inputString, setInputString, messagesEndRef, onClickHandler } =
    useChattingUpdate();

  const translation = useTranslation("ko-kr").messages;

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  return (
    <Flex
      css={css`
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          word-break: break-all;
          overflow-y: scroll;
        `}
      >
        {chattingState.map(({ nickname, message, id }, idx) => {
          return (
            <div
              key={nickname + idx}
              css={css`
                display: flex;
                flex-direction: column;
                align-items: ${doc.clientID === id ? "flex-end" : "flex-start"};
                padding: 10px;
              `}
            >
              {doc.clientID !== id && (
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
      </div>
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
          placeholder={translation["chatting.input.placeholder"]}
          value={inputString}
          onChange={(e) => {
            setInputString(e.target.value.substring(0, 50));
          }}
          onKeyPress={onKeyPressHandler}
        />
        <Button onClick={onClickHandler}>
          {translation["chatting.input"]}
        </Button>
      </div>
    </Flex>
  );
};
export default Chatting;
