import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import DraweeLogo from "@asset/DraweeLogo.png";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from "@chakra-ui/react";
import { providerState, userSelector } from "@common/recoil/recoil.atom";
import { nanoid } from "nanoid";
import { getTranslation } from "src/translations";
import { useTranslation } from "@hooks/useTransitions";
import { useRecoilState } from "recoil";

export default function Home({ roomId }: { roomId: string }) {
  const [nickname, setNickname] = useState(null);
  const translation = useTranslation("ko-kr").messages;
  const [userState, setUserState] = useRecoilState(userSelector);
  console.log(roomId);

  const handleInputChange = (e) => setNickname(e.target.value);
  const isError = nickname === "";
  return (
    <div>
      <Flex w={"100%"} h={"100vh"} alignItems={"center"} p={"3em"}>
        <Flex
          direction={{ base: "column" }}
          alignItems={"center"}
          w={"100%"}
          h={"100%"}
          border="3px solid gray"
          boxShadow="dark-lg"
          rounded="md"
        >
          <Flex
            position={"absolute"}
            m={5}
            height={"150px"}
            width={"100%"}
            justifyContent={"center"}
          >
            <Image src={DraweeLogo} width={150} height={150} alt="로고이미지" />
          </Flex>
          <Flex
            w={"100%"}
            h={"100%"}
            p="3em"
            pt={"198px"}
            justifyContent={"center"}
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: "10px", md: "20px" }}
          >
            <Flex
              w={{ base: "100%", md: "350px", xl: "600px" }}
              height="100%"
              borderRadius={"15px"}
              border="3px solid gray"
              boxShadow="dark-lg"
              rounded="md"
            >
              <FormControl isInvalid={isError}>
                <FormLabel>{translation["user.nickname"]}</FormLabel>
                <Input
                  type="email"
                  value={nickname}
                  onChange={handleInputChange}
                />
                <Stack>
                  {!isError ? (
                    <FormHelperText>로비로 GOGO</FormHelperText>
                  ) : (
                    <FormErrorMessage>{`${translation["user.nickname"]} is required.`}</FormErrorMessage>
                  )}
                </Stack>
                <Link href="/lobby" passHref legacyBehavior>
                  <Button
                    onClick={() => {
                      if (!!providerState.provider) {
                        providerState.clearProvider();
                      }
                      providerState.createProvider(roomId);
                      setUserState({ roomId, nickname });
                    }}
                  >
                    Button
                  </Button>
                </Link>
              </FormControl>
            </Flex>
            <Flex
              w={{ base: "100%", md: "350px", xl: "600px" }}
              height="100%"
              borderRadius={"15px"}
              border="3px solid gray"
              boxShadow="dark-lg"
              rounded="md"
            >
              asdf
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export async function getServerSideProps(context) {
  const roomId = context.query?.roomId;
  console.log(roomId);
  return {
    props: { roomId: roomId === undefined ? nanoid() : roomId },
  };
}
