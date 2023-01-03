import Layout from "@components/layout";
import dynamic from "next/dynamic";

const CreateQuestion = dynamic(import("@components/CreateQuestion"), {
  ssr: false,
});
const Start = () => {
  return (
    <Layout>
      <CreateQuestion></CreateQuestion>
    </Layout>
  );
};
export default Start;
