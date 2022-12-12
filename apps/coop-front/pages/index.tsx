import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Draw = dynamic(() => import("@components/Draw"), { ssr: false });

export default function Home() {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  }, []);

  return (
    <div className={styles.container}>
      <div>asdfasdfsa</div>
      <Draw></Draw>
    </div>
  );
}
