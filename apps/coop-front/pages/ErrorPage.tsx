import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import Head from "next/head";

type ErrorPagePropsType = {
  statusCode: string | null;
  errorMessage: string | null;
};

const ErrorPage = ({ statusCode, errorMessage }: ErrorPagePropsType) => {
  const { t } = useTranslation("common");
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
      <Head>
        <meta property="og:title" content={t("seo.error.title")} />
      </Head>
      <div>statusCode</div>
      <div>{statusCode}</div>
      <div>errorMessage</div>
      <div>{errorMessage}</div>
      <Button onClick={() => router.push("/")}>빠르게 돌아가기</Button>
    </div>
  );
};
export default ErrorPage;

ErrorPage.getInitialProps = ({ res, req, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const errorMessage = res ? res.errorMessage : err ? err.errorMessage : 404;

  return {
    props: {
      statusCode,
      errorMessage,
    },
  };
};
