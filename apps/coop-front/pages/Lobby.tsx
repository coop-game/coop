import dynamic from "next/dynamic";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import useCheckDuplicateWindows from "@hooks/useCheckDuplicateWindows";

const Lobby = () => {
  useHistoryBack();
  useCheckDuplicateWindows();
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
