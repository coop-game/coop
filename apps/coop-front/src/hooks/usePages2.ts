import { doc } from "@common/recoil/recoil.atom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const yText = doc.getText("pageState");

const usePages2 = () => {
  const router = useRouter();
  const [pageState, setPageState] = useState(null);

  useEffect(() => {
    yText.observe(() => {
      const text = yText.toString();
      const pageState = JSON.parse(text);
      if (pageState.path !== router.pathname) {
        router.push(pageState.path);
      }
      setPageState(pageState);
    });
  }, [router]);

  const onPushHandler = (obj) => {
    doc.transact(() => {
      const text = yText.toString();
      const pageState = JSON.parse(text);
      const newPageState = { ...pageState, ...obj };
      yText.delete(0, text.length);
      yText.insert(0, JSON.stringify(newPageState));
    });
  };

  return { pageState, onPushHandler };
};

type CPGamePage = {
  answer: string;
  question: string;
  questioner: string;
};

type CPGameState = {
  isGameStart: boolean;
  gamePages: CPGamePage;
  gamePagesIndex: number;
  nowPage: "/lobby" | "/draw" | "/result";
};

export default usePages2;
