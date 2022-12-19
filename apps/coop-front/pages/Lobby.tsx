import DraweeLogo from "@asset/DraweeLogo.png";
import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import Users from "@components/Users";
import dynamic from "next/dynamic";

const Lobby = () => {
  const LobbyMain = dynamic(() => import("@components/LobbyMain"));
  return <LobbyMain></LobbyMain>;
};

export default Lobby;
