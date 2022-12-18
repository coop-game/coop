import { providerState } from "@common/recoil/recoil.atom";
import { useRouter } from "next/router";

const useCheckCreatedProvider = (path = "/") => {
  const { provider } = providerState;
  const router = useRouter();
  if (provider === null) {
    router.push(`${path}`);
  }
};

export default useCheckCreatedProvider;
