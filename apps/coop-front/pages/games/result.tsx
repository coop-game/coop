import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import dynamic from "next/dist/shared/lib/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const Result = () => {
  useHistoryBack();
  const GameResult = dynamic(
    () => import("@components/Game/Result/GameResult"),
    {
      ssr: false,
    }
  );
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <meta property="og:title" content={t("seo.result.title")} />
      </Head>
      <Layout>
        <GameResult />
      </Layout>
    </>
  );
};
export default Result;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
