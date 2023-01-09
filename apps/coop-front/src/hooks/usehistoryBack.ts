import { providerState, yUserProfilesState } from "@common/yjsStore/userStore";
import router from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "./useTransitions";

const useHistoryBack = () => {
  const translation = useTranslation().messages;
  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      window.history.pushState(null, "", router.asPath);
      const isConfirmed = confirm(`${translation["backspace"]}`);
      if (isConfirmed) {
        window.location.href = "/";
      }
      return isConfirmed;
    });
  }, []);
};
export default useHistoryBack;
