import { Box, Text } from "@chakra-ui/react";
import Chatting from "@components/Chat/Chatting";
import Progress from "@components/Progress";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Wating = ({
  isPlay,
  setIsPlay,
  startTime,
}: {
  isPlay: "running" | "paused";
  setIsPlay: Dispatch<SetStateAction<"running" | "paused">>;
  startTime: number;
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  useEffect(() => {
    if (isPlay === "paused") {
      setIsPlay("running");
    }
  }, [isPlay, setIsPlay]);
  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Progress
        time={20000}
        callback={() => {}}
        play={isPlay}
        startTime={startTime}
      />
      <Text
        fontWeight={"extrabold"}
        fontSize={{ sm: "xl", md: "4xl" }}
        paddingTop={"5%"}
      >
        {t("relay.race.wating.other.player")}
      </Text>
      <Box w="100%" height="500px" display="flex" justifyContent="center">
        <Box w="100%" maxW="800px" height="500px">
          <Chatting />
        </Box>
      </Box>
    </Box>
  );
};

export default Wating;
