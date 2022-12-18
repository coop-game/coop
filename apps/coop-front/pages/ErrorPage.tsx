import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type ErrorPagePropsType = {
  statusCode: string | null;
  errorMessage: string | null;
};

const ErrorPage = ({ statusCode, errorMessage }: ErrorPagePropsType) => {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      router.push("/");
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [router]);
  return (
    <div>
      <div>statusCode</div>
      <div>{statusCode}</div>
      <div>errorMessage</div>
      <div>{errorMessage}</div>
      <Button onClick={() => router.push("/")}>빠르게 돌아가기</Button>
    </div>
  );
};
export default ErrorPage;

export async function getServerSideProps(context) {
  return {
    props: {
      statusCode: context?.query?.statusCode ?? null,
      errorMessage: context?.query?.errorMessage ?? null,
    },
  };
}
