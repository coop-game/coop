import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Copyright from "@components/layout/Footer/Copyright";

function DrawPage() {
  useHistoryBack();
  const Draw = dynamic(() => import("@components/Game/Drawee/Draw"), {
    ssr: false,
  });
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <meta property="og:title" content={t("seo.draw.title")} />
      </Head>
      <Layout>
        <Draw></Draw>
      </Layout>
    </>
  );
}
export default DrawPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
