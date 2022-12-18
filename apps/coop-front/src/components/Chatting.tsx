import { Button, Flex, Input } from "@chakra-ui/react";
import {
  ChattingSelector,
  doc,
  userSelector,
} from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import useChattingUpdate from "@hooks/useChattingUpdate";
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
  console.log(translation["chatting.input.placeholder"]);

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
          overflow-y: scroll;
        `}
      >
        {chattingState.map(({ nickname, message, id }, idx) => {
          return (
            <div key={nickname + idx}>
              <div>{nickname}</div>
              {doc.clientID === id && <div>나임</div>}
              <div>{message}</div>
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
            setInputString(e.target.value);
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
