import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Image from "next/image";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type ErrorPagePropsType = {
  statusCode?: string | null;
};

const ErrorPage = ({ statusCode }: ErrorPagePropsType) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isAnimationEnd = useRecoilValue(transitionPageAnimationState);
  const [second, setSecond] = useState(3);
  useEffect(() => {
    if (isAnimationEnd === false) return;
    const interval = setInterval(() => {
      if (second === 0) {
        router.push("/");
      } else {
        setSecond((prev) => prev - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [router, second, isAnimationEnd]);
  return (
    <>
      <Head>
        <meta property="og:title" content={t("seo.error.title")} />
      </Head>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"100%"}
        fontWeight={"700"}
        fontSize={"3rem"}
        gap={"30px"}
      >
        <Flex
          justifyContent={"center"}
          fontSize={"5rem"}
          color={"blueViolet"}
          userSelect={"none"}
          pointerEvents={"none"}
        >
          {statusCode}
        </Flex>
        <Flex
          justifyContent={"center"}
          userSelect={"none"}
          pointerEvents={"none"}
        >
          {t("error.page.wrong.access")}
        </Flex>
        <Flex
          justifyContent={"center"}
          userSelect={"none"}
          pointerEvents={"none"}
        >{`${second} ${t("error.second.after.move")}`}</Flex>
        <Button onClick={() => router.push("/")}>
          {t("error.page.back.button")}
        </Button>
      </Flex>
    </>
  );
};
export default ErrorPage;

export const getServerSideProps = async ({ query, locale }) => {
  const { statusCode } = query;
  return {
    props: {
      statusCode: statusCode ?? "404",
      ...(await serverSideTranslations(locale ?? "ko", ["common"])),
    },
  };
};
