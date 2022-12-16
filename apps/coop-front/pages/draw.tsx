import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Draw = dynamic(() => import("@components/Draw"), { ssr: false });

function DrawPage() {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  }, []);

  return <div className={styles.container}>{state && <Draw></Draw>}</div>;
}
export default DrawPage;
