import { providerState, yUserProfilesState } from "@common/yjsStore/userStore";

const useHistoryBack = () => {
  if (typeof window !== "undefined") {
    const { provider } = providerState;
    window.onpopstate = function () {
      providerState.clearProvider();
      provider.awareness.destroy();
      window.location.href = "/welcome";
      console.log("작동했냐???");
    };
  }
};
export default useHistoryBack;
