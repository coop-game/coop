import dynamic from "next/dynamic";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import useCheckDuplicateWindows from "@hooks/useCheckDuplicateWindows";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";

const URL = process.env.NEXT_PUBLIC_HOSTNAME || "http://localhost:3001";

const Lobby = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  useHistoryBack();
  useCheckDuplicateWindows();
  const { t } = useTranslation("common");
  const LobbyMain = dynamic(() => import("@components/Game/common/LobbyMain"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <meta property="og:title" content={t("seo.lobby.title")} />
      </Head>
      <Layout>
        <LobbyMain></LobbyMain>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});

export default Lobby;
