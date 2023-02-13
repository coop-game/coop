import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useRecoilValue } from "recoil";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Error404Page = () => {
  const isAnimationEnd = useRecoilValue(transitionPageAnimationState);
  const [second, setSecond] = useState(3);
  const router = useRouter();
  const { t } = useTranslation("common");
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
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
      fontWeight={"700"}
      fontSize={"3rem"}
      gap={"30px"}
      userSelect={"none"}
      pointerEvents={"none"}
    >
      <Flex justifyContent={"center"}>
        <Image
          width={450}
          height={150}
          src={"/images/svg/404.svg"}
          alt={"404"}
        />
      </Flex>
      <Flex justifyContent={"center"}>{t("error.404.oops")}</Flex>
      <Flex justifyContent={"center"}>{t("error.404.page.not.found")}</Flex>
      <Flex justifyContent={"center"}>{`${second} ${t(
        "error.second.after.move"
      )}`}</Flex>
    </Flex>
  );
};
export default Error404Page;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
