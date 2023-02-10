/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Chatting from "@components/Chat/Chatting";
import { providerState } from "@common/yjsStore/userStore";
import { Button, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

export default {
  title: "Chat/Chatting",
  component: Chatting,
};

const Template = (args) => {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button
        onClick={() => {
          toggleColorMode();
        }}
      >
        toggleColorMode
      </Button>
      <div
        css={css`
          width: 100%;
          height: 500px;
          position: relative;
        `}
      >
        <Chatting />
      </div>
    </>
  );
};

export const Primary = Template.bind({});
