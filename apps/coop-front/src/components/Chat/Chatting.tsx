/** @jsxImportSource @emotion/react */
import { Box, Button, Flex, Input, useColorMode } from "@chakra-ui/react";
import { ChattingSelector, userSelector } from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import { css } from "@emotion/react";
import useChattingUpdate from "@hooks/gameHooks/gameChatting/useChattingUpdate";
import React, { useRef } from "react";
import { useRecoilValue } from "recoil";
import { useTranslation } from "next-i18next";
import ScrollBottomButton from "../Scroll/ScrollButtonButton";
import ChatLine from "./ChatLine";
import Image from "next/image";

const Chatting = () => {
  const { t } = useTranslation("common");
  const chattingState = useRecoilValue(ChattingSelector);
  const { inputString, setInputString, messagesEndRef, onClickHandler } =
    useChattingUpdate();
  const { colorMode } = useColorMode();
  const chattingInputPlaceholder = t("chatting.input.placeholder");
  const ref = useRef(null);

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
        position: relative;
      `}
    >
      <Flex
        ref={ref}
        backgroundColor={colorMode === "light" ? "#ece6cc" : "#a59a6b"}
        borderRadius={"8px 8px 0px 0px"}
        css={css`
          flex-direction: column;
          word-break: break-all;
          overflow-y: scroll;
          height: 100%;
        `}
      >
        {chattingState.map((v, idx) => {
          return <ChatLine key={idx} {...v}></ChatLine>;
        })}
        <div
          css={css`
            position: absolute;
            width: 250px;
            height: 30px;
            bottom: 70px;
            left: 50%;
            transform: translateX(-50%);
          `}
        >
          <ScrollBottomButton
            rootRef={ref}
            input={chattingState.map((v) => v.message)}
          ></ScrollBottomButton>
        </div>
      </Flex>
      <Box
        css={css`
          display: flex;
          gap: 3px;
          padding: 3px;
          justify-content: center;
          align-items: center;
        `}
        borderRadius="0px 0px 8px 8px"
        backgroundColor={colorMode === "light" ? "#fffceb" : "#232323"}
      >
        <Input
          css={css`
            flex-grow: 1;
            height: 40px;
          `}
          placeholder={chattingInputPlaceholder}
          value={inputString}
          onChange={(e) => {
            setInputString(e.target.value.substring(0, 50));
          }}
          onKeyPress={onKeyPressHandler}
        />
        <Button
          onClick={onClickHandler}
          css={css`
            height: 40px;
          `}
        >
          <Image
            width={35}
            height={35}
            src={"/images/svg/send.svg"}
            alt={"send icon"}
          />
        </Button>
      </Box>
    </Flex>
  );
};
export default Chatting;
