import Layout from "@components/layout";
import dynamic from "next/dynamic";

const Start = () => {
  const CreateQuestion = dynamic(() => import("@components/CreateQuestion"), {
    ssr: false,
  });
  return (
    <Layout>
      <CreateQuestion></CreateQuestion>
    </Layout>
  );
};
export default Start;
