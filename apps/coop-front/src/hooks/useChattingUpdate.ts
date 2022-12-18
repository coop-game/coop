import { Button, Flex, Input } from "@chakra-ui/react";
import {
  ChattingSelector,
  doc,
  userSelector,
} from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import { CPChatType } from "@types";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const yarray = doc.getArray<CPChatType>("chatting");

const useChattingUpdate = () => {
  const [chattingState, setChattingState] = useRecoilState(ChattingSelector);
  const { nickname } = useRecoilValue(userSelector) ?? {};

  const [inputString, setInputString] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>();
  useEffect(() => {
    yarray.observe(() => {
      const arr = yarray.toArray();
      setChattingState([...arr]);
    });
    return () => {
      setChattingState([]);
    };
  }, [setChattingState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chattingState]);

  const onClickHandler = () => {
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
