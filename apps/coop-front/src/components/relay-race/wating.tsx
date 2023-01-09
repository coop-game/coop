import { Box } from "@chakra-ui/react";
import Chatting from "@components/Chatting";
import Progress from "@components/Progress";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Wating = ({
  isPlay,
  setIsPlay,
}: {
  isPlay: "running" | "paused";
  setIsPlay: Dispatch<SetStateAction<"running" | "paused">>;
}) => {
  useEffect(() => {
    if (isPlay === "paused") {
      setIsPlay("running");
    }
  }, [isPlay, setIsPlay]);
  return (
    <Box
      w="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Progress time={50000} callback={() => {}} play={isPlay} />
      <div>다른 사람들이 문제를 풀고 있습니다. 대기 해주십시오.</div>
      <Box w="100%" height="500px" display="flex" justifyContent="center">
        <Box w="100%" maxW="800px" height="500px">
          <Chatting />
        </Box>
      </Box>
    </Box>
  );
};

export default Wating;
