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
                align-items: ${doc.clientID === id ? "flex-start" : "flex-end"};
                padding: 10px;
              `}
            >
              <div>{nickname} </div>
              <div
                css={css`
                  background: #00eaff;
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
          padding: 3px;
        `}
      >
        <Input
          placeholder={translation["chatting.input.placeholder"]}
          value={inputString}
          onChange={(e) => {
            setInputString(e.target.value.substring(0, 50));
          }}
          onKeyPress={onKeyPressHandler}
        />
        <Button
          css={css`
            width: 100%;
          `}
          onClick={onClickHandler}
        >
          {translation["chatting.input"]}
        </Button>
      </div>
    </Flex>
  );
};
export default Chatting;
