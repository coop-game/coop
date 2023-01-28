import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

function DrawPage() {
  useHistoryBack();
  const Draw = dynamic(() => import("@components/Draw"), { ssr: false });

  return (
    <Layout>
        <Draw></Draw>
    </Layout>
  );
}
export default DrawPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
