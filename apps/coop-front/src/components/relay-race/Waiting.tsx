import { Box, Text } from "@chakra-ui/react";
import Chatting from "@components/Chatting";
import Progress from "@components/Progress";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

const Wating = ({
  isPlay,
  setIsPlay,
  startTime,
}: {
  isPlay: "running" | "paused";
  setIsPlay: Dispatch<SetStateAction<"running" | "paused">>;
  startTime: number;
}) => {
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
        time={50000}
        callback={() => {}}
        play={isPlay}
        startTime={startTime}
      />
      <Text fontWeight={"extrabold"} fontSize={"4xl"} paddingTop={"5%"}>
        <FormattedMessage
          id={"relay.race.wating.other.player"}
          values={{ locale: router.locale }}
        />
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
