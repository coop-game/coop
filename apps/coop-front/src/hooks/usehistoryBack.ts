import { providerState, yUserProfilesState } from "@common/yjsStore/userStore";
import router from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

const useHistoryBack = () => {
  const { t } = useTranslation("common");

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      window.history.pushState(null, "", router.asPath);
      const isConfirmed = confirm(t("backspace"));
      if (isConfirmed) {
        window.location.href = "/games";
      }
      return isConfirmed;
    });
  }, [t]);
};
export default useHistoryBack;
