import { providerState, yUserProfilesState } from "@common/yjsStore/userStore";
import router from "next/router";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

const useHistoryBack = () => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      window.history.pushState(null, "", router.asPath);
      const isConfirmed = confirm(`${formatMessage({ id: "backspace" })}`);
      if (isConfirmed) {
        window.location.href = "/";
      }
      return isConfirmed;
    });
  }, [formatMessage]);
};
export default useHistoryBack;
