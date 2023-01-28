import styles from "../styles/Home.module.css";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import dynamic from "next/dist/shared/lib/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

const Result = () => {
  useHistoryBack();
  const GameResult = dynamic(() => import("@components/Result/GameResult"), {
    ssr: false,
  });

  return (
    <Layout>
      <GameResult />
    </Layout>
  );
};
export default Result;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
