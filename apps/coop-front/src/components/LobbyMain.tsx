import DraweeLogo from "@asset/DraweeLogo.png";
import Image from "next/image";
import { Button, Flex } from "@chakra-ui/react";
import Users from "@components/Users";
import dynamic from "next/dynamic";
import { providerState } from "@common/recoil/recoil.atom";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";

type userProfile = {
  id?: string;
  nickname?: string;
};

export const LobbyMain = () => {
  const { provider, room } = providerState;
  const [userProfiles, setUserProfiles] = useState<Array<userProfile>>([]);

  const filterMap = useCallback(() => {
    const userProfiles = [];
    provider.awareness.getStates().forEach((v) => {
      console.log(v);
      if (v?.user) {
        const user: userProfile = {};
        user.id = v.id;
        user.nickname = v.user.name;
        userProfiles.push(user);
      }
    });
    return userProfiles;
  }, [provider.awareness]);

  useEffect(() => {
    provider.awareness.on(
      "change",
      ({
        added,
        updated,
        removed,
      }: {
        added: any;
        updated: any;
        removed: any;
      }) => {
        console.log("added : ", added);
        console.log("updated : ", updated);
        console.log("removed : ", removed);
        console.log(Array.from(provider.awareness.getStates()));
        setUserProfiles(filterMap());
      }
    );
    provider.awareness.setLocalStateField("user", {
      name: "테스트" + nanoid(),
      color: "#ffb61e",
    });
  }, [filterMap, provider, room]);

  if (provider === null) {
    return <div>provider가 비어있습니다. 메인으로 되돌아가면 됨 link!!</div>;
  }

  return (
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
          <Users userProfiles={userProfiles} />
          <Flex
            w={{ base: "100%", md: "350px", xl: "600px" }}
            height="100%"
            borderRadius={"15px"}
            border="3px solid gray"
            boxShadow="dark-lg"
            rounded="md"
          >
            <Link href="/draw" passHref legacyBehavior>
              <Button>다음으로 넘어가기</Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default LobbyMain;
