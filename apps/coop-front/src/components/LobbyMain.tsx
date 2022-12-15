import DraweeLogo from "@asset/DraweeLogo.png";
import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import Users from "@components/Users";
import dynamic from "next/dynamic";
import { providerState } from "@common/recoil/recoil.atom";
import { useEffect, useState } from "react";

export const LobbyMain = () => {
  const { provider } = providerState;
  const [userProfiles, setUserProfiles] = useState<
    Array<{
      id: string;
      nickname: string;
    }>
  >([]);

  useEffect(() => {
    const temp = [];
    provider?.awareness?.states.forEach((v) => {
      const tdUser = v?.presence?.tdUser.id.split("|");
      if (tdUser !== undefined) {
        const user = { id: tdUser[0], nickname: tdUser[1] };
        temp.push(user);
      }
    });
    setUserProfiles(temp);
  }, [provider?.awareness?.states?.size]);

  if (provider === null) {
    return <div>provider가 비어있습니다. 메인으로 되돌아가면 됨 link!!</div>;
  }
  //   const userProfiles = [
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //     { id: "asdf", nickname: "asdf" },
  //   ];
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
          ></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default LobbyMain;
