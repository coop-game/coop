import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@components/layout";

const Draw = dynamic(() => import("@components/Draw"), { ssr: false });

function DrawPage() {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  }, []);

  return (
    <Layout>
      <div className={styles.container}>{state && <Draw></Draw>}</div>
    </Layout>
  );
}
export default DrawPage;
