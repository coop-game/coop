import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import dynamic from "next/dynamic";

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
