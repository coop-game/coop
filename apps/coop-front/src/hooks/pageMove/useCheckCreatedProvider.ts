import { providerState } from "@common/yjsStore/userStore";
import { useRouter } from "next/router";

const useCheckCreatedProvider = (path = "/") => {
  const { provider } = providerState;
  const router = useRouter();
  if (provider === null) {
    router.replace(`${path}`);
  }
};

export default useCheckCreatedProvider;
