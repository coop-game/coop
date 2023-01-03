import dynamic from "next/dynamic";
import Layout from "@components/layout";

const Lobby = () => {
  const LobbyMain = dynamic(() => import("@components/LobbyMain"), {
    loading: () => {
      return <div>Loading...</div>;
    },
  });

  return (
    <Layout>
      <LobbyMain></LobbyMain>
    </Layout>
  );
};

export default Lobby;
