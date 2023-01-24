import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@components/layout";
import useHistoryBack from "@hooks/usehistoryBack";

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
