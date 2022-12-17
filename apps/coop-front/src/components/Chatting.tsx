import { Button, Input } from "@chakra-ui/react";
import {
  CPChatType,
  ChattingSelector,
  doc,
  userSelector,
} from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const yarray = doc.getArray<CPChatType>("chatting");

const Chatting = () => {
  const [inputString, setInputString] = useState("");
  const { nickname } = useRecoilValue(userSelector) ?? {};
  const [chattingState, setChattingState] = useRecoilState(ChattingSelector);

  useEffect(() => {
    yarray.observe(() => {
      const arr = yarray.toArray();
      console.log("arr", arr);
      setChattingState([...arr]);
    });
  }, [setChattingState]);
  const onClickHandler = () => {
    const newChat = {
      nickname,
      message: inputString,
    };
    yarray.push([newChat]);
    setInputString("");
  };
  return (
    <div>
      <div
        css={css`
          height: 500px;
          overflow-y: scroll;
        `}
      >
        {chattingState.map(({ nickname, message }, idx) => {
          return (
            <div key={nickname + idx}>
              <div>{nickname}</div>
              <div>{message}</div>
            </div>
          );
        })}
      </div>
      <Input
        variant="flushed"
        placeholder="Flushed"
        value={inputString}
        onChange={(e) => {
          setInputString(e.target.value);
        }}
      />
      <Button onClick={onClickHandler}>채팅</Button>
    </div>
  );
};
export default Chatting;
