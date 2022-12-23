import { Button, Flex, Input } from "@chakra-ui/react";
import { ChattingSelector, userSelector } from "@common/recoil/recoil.atom";
import { doc } from "@common/yjsStore/userStore";
import { css } from "@emotion/react";
import { CPChatType } from "@types";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const yarray = doc.getArray<CPChatType>("chatting");

const useChattingUpdate = () => {
  const [chattingState, setChattingState] = useRecoilState(ChattingSelector);
  const { nickname } = useRecoilValue(userSelector) ?? {};

  const [inputString, setInputString] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>();

  const observeFunction = useCallback(() => {
    const arr = yarray.toArray();
    setChattingState([...arr]);
  }, [setChattingState]);

  useEffect(() => {
    yarray.observe(observeFunction);
    return () => {
      yarray.unobserve(observeFunction);
      setChattingState([]);
    };
  }, [observeFunction, setChattingState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chattingState]);

  const onClickHandler = () => {
    if (inputString === "") return;
    const newChat = {
      id: doc.clientID,
      nickname,
      message: inputString,
    };
    yarray.push([newChat]);
    setInputString("");
  };

  return { inputString, setInputString, messagesEndRef, onClickHandler };
};
export default useChattingUpdate;
