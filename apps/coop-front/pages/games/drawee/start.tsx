import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";

const CreateQuestion = dynamic(
  import("@components/Game/Drawee/CreateQuestion"),
  {
    ssr: false,
  }
);

const Start = () => {
  useHistoryBack();
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <meta property="og:title" content={t("seo.lobby.title")} />
      </Head>
      <Layout>
        <CreateQuestion></CreateQuestion>
      </Layout>
    </>
  );
};
export default Start;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
