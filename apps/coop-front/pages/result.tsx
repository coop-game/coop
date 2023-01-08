import styles from "../styles/Home.module.css";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";
import dynamic from "next/dist/shared/lib/dynamic";

const Result = () => {
  useHistoryBack();
  const GameResult = dynamic(() => import("@components/Result/GameResult"));

  return (
    <Layout>
      <div className={styles.container}>
        <GameResult />
      </div>
    </Layout>
  );
};
export default Result;
