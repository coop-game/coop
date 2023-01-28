import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

const CreateQuestion = dynamic(import("@components/CreateQuestion"), {
  ssr: false,
});
const Start = () => {
  useHistoryBack();
  return (
    <Layout>
      <CreateQuestion></CreateQuestion>
    </Layout>
  );
};
export default Start;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});