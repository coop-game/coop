import DraweeLogo from "@asset/DraweeLogo.png";
import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import Users from "@components/Users";
import dynamic from "next/dynamic";
import Layout from "@components/layout";

const Lobby = () => {
  const LobbyMain = dynamic(() => import("@components/LobbyMain"));
  return (
    <Layout>
      <LobbyMain></LobbyMain>;
    </Layout>
  );
};

export default Lobby;
