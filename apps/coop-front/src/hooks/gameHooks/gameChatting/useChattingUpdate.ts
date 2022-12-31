import { ChattingSelector, userSelector } from "@common/recoil/recoil.atom";
import { doc } from "@common/yjsStore/userStore";
import { CPChatType } from "@types";
import { useCallback, useEffect, useRef } from "react";
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

  // observe를 통한 상태값 동기화
  useEffect(() => {
    yarray.observe(observeFunction);
    return () => {
      yarray.unobserve(observeFunction);
      setChattingState([]);
    };
  }, [observeFunction, setChattingState]);

  // 스크롤 하단 고정 유지
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chattingState]);

  // 처음 렌더링 될때 chatting state recoil 초기값 갱신
  useEffect(() => {
    observeFunction();
  }, [observeFunction]);

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
