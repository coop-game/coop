import { useRouter } from "next/router";
import { userSelector } from "@common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { doc, providerState } from "@common/yjsStore/userStore";

const useCheckDuplicateWindows = () => {
  const { roomId } = ({} = useRecoilValue(userSelector));
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const channel = new BroadcastChannel(`tab ${roomId}`);
      let isOriginal = true;
      channel.postMessage(`another-tab`);
      channel.addEventListener("message", (msg) => {
        if (msg.data === "another-tab" && isOriginal) {
          channel.postMessage("already-open");
        }
        if (msg.data === "already-open") {
          isOriginal = false;
          alert("Cannot open multiple instances");
          providerState.provider.disconnect();
          router.replace("/welcome");
        }
      });
    }
  }, [roomId, router]);
  return {};
};
export default useCheckDuplicateWindows;
