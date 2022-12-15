import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { providerState } from "@common/recoil/recoil.atom";

export default function Home() {
  const [inputState, setInputState] = useState("");
  const [roomId, setRoomId] = useState(null);

  return (
    <div className={styles.container}>
      <input
        type="text"
        name={"roomId"}
        value={inputState}
        onChange={(e) => {
          setInputState(e.target.value);
        }}
      />
      <Link href="/lobby" passHref legacyBehavior>
        <Button
          onClick={() => {
            if (!!providerState.provider) {
              providerState.clearProvider();
            }
            providerState.createProvider(inputState);
            setRoomId(inputState);
            setInputState("");
          }}
        >
          Button
        </Button>
      </Link>
      <div>{roomId}</div>
    </div>
  );
}
