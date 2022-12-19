import { doc, yPages } from "@common/recoil/recoil.atom";
import { CPPages } from "@types";
import { useRouter } from "next/router";
import { useEffect } from "react";
const usePages = () => {
  const router = useRouter();
  useEffect(() => {
    yPages.observe(() => {
      console.log("observe ?????");
      const pages: CPPages = yPages.toArray();
      if (pages.length > 0 && pages[0].path !== router.pathname) {
        router.push(`/${pages[0].path}`);
      }
    });
  }, [router]);

  const pagePushHandler = () => {
    doc.transact(() => {
      yPages.push([{ path: "/draw" }]);
      yPages.delete(0, 1);
    });
    // router.push(path);
  };
  return { pagePushHandler };
};
export default usePages;
