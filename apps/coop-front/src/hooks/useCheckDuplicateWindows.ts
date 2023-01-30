import { useRouter } from "next/router";
import { userSelector } from "@common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { providerState } from "@common/yjsStore/userStore";
import { useTranslation } from "react-i18next";

const useCheckDuplicateWindows = () => {
  const { t } = useTranslation("common");
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const router = useRouter();
  useEffect(() => {
    let isOriginal = true;
    const channel = new BroadcastChannel(`tab ${roomId}`);
    function eventFunction(msg: { data: string }) {
      if (msg.data === "another-tab" && isOriginal) {
        channel.postMessage("already-open");
      }
      if (msg.data === "already-open") {
        isOriginal = false;
        alert(t("alert.warning.multiple.instances"));
        providerState.provider.disconnect();
        router.push("/welcome");
      }
    }
    if (typeof window !== "undefined" && !!roomId) {
      channel.postMessage(`another-tab`);
      channel.addEventListener("message", eventFunction);
    }
    return () => {
      channel.removeEventListener("message", eventFunction);
    };
  }, [roomId, router]);
};
export default useCheckDuplicateWindows;
