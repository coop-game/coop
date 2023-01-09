import { providerState, yUserProfilesState } from "@common/yjsStore/userStore";
import router from "next/router";
import { useEffect, useState } from "react";

const useHistoryBack = () => {
  // const [state, setState] = useState(false);

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      console.log("기록이 남니?");
      window.history.pushState(null, "", router.asPath);
      // I only want to allow these two routes!
      // console.log(url, as, options);
      // const test = confirm("진짜할거임??");
      // if (as !== "/" && as !== "/other") {
      //   // Have SSR render bad routes as a 404.
      //   window.location.href = as;
      //   return false;
      // }

      return false;
    });
  }, []);

  // useEffect(() => {
  //   const a = () => {
  //     return confirm("Do you really want to close?");
  //   };
  //   window.addEventListener("beforeunload", a);
  //   return () => {
  //     window.removeEventListener("beforeunload", a);
  //   };
  // }, []);

  // useEffect(() => {
  //   router.beforePopState(() => {
  //     window.history.pushState(null, "", router.asPath);
  //     const isConfirmed = window.confirm("정말 날려?");
  //     console.log("?????????????");

  //     if (isConfirmed) {
  //       router.beforePopState(() => true);
  //       router.back();
  //     }
  //     return false;
  //   });
  // }, [state]);
  // console.log("useHistoryBack");
  // if (typeof window !== "undefined") {
  //   const { provider } = providerState;
  //   window.onpopstate = () => {
  //     alert("?????");
  //     const res = confirm("정말 뒤로가시겠습니다?? 데이터가 날라갈지도 몰라요");
  //     if (res) {
  //       providerState.provider.disconnect;
  //       window.location.href = "/welcome";
  //       console.log("작동했냐???");
  //     }
  //   };
  // }
  // useEffect(() => {
  //   const eventFunction = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //   };
  //   window.addEventListener("beforeunload", eventFunction, { capture: true });
  //   return () => {
  //     window.removeEventListener("beforeunload", eventFunction, {
  //       capture: true,
  //     });
  //   };
  // }, []);
};
export default useHistoryBack;
