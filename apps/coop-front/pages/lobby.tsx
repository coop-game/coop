import dynamic from "next/dynamic";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import useCheckDuplicateWindows from "@hooks/useCheckDuplicateWindows";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

const Lobby = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  useHistoryBack();
  useCheckDuplicateWindows();
  const LobbyMain = dynamic(() => import("@components/LobbyMain"), {
    // loading: () => {
    //   return <div>Loading...</div>;
    // },
    ssr: false,
  });

  return (
    <Layout>
      <LobbyMain></LobbyMain>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});

export default Lobby;
