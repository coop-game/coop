import { Button, Flex, Stack } from "@chakra-ui/react";
import { userSelector, userState } from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";

const AvatarImage = ({
  avatarIndex,
  borderColor,
  randomAvatarHandler,
}: {
  avatarIndex: number;
  borderColor: string;
  randomAvatarHandler?: () => void;
}) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      width="100%"
      height="100%"
      minWidth="200px"
      minHeight="250px"
      gap="10px"
    >
      <Stack
        width="200px"
        height="200px"
        minWidth="200px"
        minHeight="200px"
        overflow={"hidden"}
        css={css`
          border-radius: 100%;
          background: rgb(200, 100, 100, 30%);
          border: 3px solid ${borderColor};
        `}
      >
        <Image
          width={200}
          height={140}
          src={`/images/avatar/${avatarIndex}.png`}
          alt={`${avatarIndex}`}
        ></Image>
      </Stack>
      {randomAvatarHandler && (
        <Button onClick={randomAvatarHandler}>????</Button>
      )}
    </Flex>
  );
};
export default AvatarImage;
7;
