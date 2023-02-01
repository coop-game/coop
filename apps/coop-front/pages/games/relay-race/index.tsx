import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "@components/layout";

const Main = () => {
  const RelayRaceStart = dynamic(
    import("@components/relay-race/RelayRaceStart"),
    { ssr: false }
  );
  return (
    <Layout>
      <Box w="100%" h="100%" minHeight="95vh" position={"relative"}>
        <RelayRaceStart />
      </Box>
    </Layout>
  );
};
export default Main;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
