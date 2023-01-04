import { Box } from "@chakra-ui/react";
import { userProfilesSelector } from "@common/recoil/recoil.atom";
import { doc, yRelayRaceAnswerState } from "@common/yjsStore/userStore";
import Chatting from "@components/Chatting";
import Progress from "@components/Progress";
import { useRecoilValue } from "recoil";

const Wating = () => {
  const { isOwner } = useRecoilValue(userProfilesSelector);
  return (
    <Box
      w="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Progress time={50000} callback={() => {}} play={"running"} />
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
