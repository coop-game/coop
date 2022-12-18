import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const translation = useTranslation("ko-kr").messages;
  const [_, setUserState] = useRecoilState(userSelector);
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [isError, setIsError] = useState(true);

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
              p={10}
              flexDirection={"column"}
            >
              <Stack height={"100%"}>
                <div>asdf</div>
              </Stack>
              <FormControl isInvalid={isError}>
                <FormLabel>{translation["user.nickname"]}</FormLabel>
                <Input
                  type="email"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setIsError(e.target.value === "");
                  }}
                />
                <Flex ml={5}>
                  {!isError ? (
                    <FormHelperText>로비로 GOGO</FormHelperText>
                  ) : (
                    <FormErrorMessage>{`${translation["user.nickname"]} is required.`}</FormErrorMessage>
                  )}
                </Flex>
                <Flex width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    onClick={() => {
                      if (nickname !== "") {
                        if (!!providerState.provider) {
                          providerState.clearProvider();
                        }
                        providerState.createProvider(roomId);
                        setUserState({ roomId, nickname });
                        router.push("/lobby");
                      } else {
                        setIsError(true);
                      }
                    }}
                  >
                    GO LOBBY
                  </Button>
                </Flex>
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
