import { Box, Flex, Text } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import CanvasViewer from "@components/CanvasViewer";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import SideUserBar from "./SideUserBar";
import LineNote from "@components/Paper/LineNote";

const RelayRaceResult = ({ nowPageIndex }: { nowPageIndex: number }) => {
  const relayRaceState = useRecoilValue<CPGameRelayRaceAnswer[]>(
    yjsRelayRaceAnswerState
  );
  console.log(nowPageIndex);
  return (
    <Flex
      w="100%"
      height="100%"
      overflow={"hidden"}
      position={"absolute"}
      // alignItems="center"
      maxH="920px"
      maxW="1200px"
      flexDirection={{ sm: "column-reverse", md: "column-reverse", lg: "row" }}
      marginTop="1%"
    >
      <Box
        w="100%"
        h="100%"
        flex={{ base: 3, lg: 2 }}
        marginRight={{ base: "0%", lg: "3%" }}
      >
        <SideUserBar nowPageIndex={nowPageIndex} />
      </Box>
      <Flex w="100%" h="100%" flex={{ base: 6, lg: 7 }} position={"relative"}>
        <LineNote>
          {relayRaceState[nowPageIndex] ? (
            <Box w="100%" h="100%">
              {relayRaceState[nowPageIndex].isDraw ? (
                <Box w={"100%"} h={"100%"} position={"relative"}>
                  <CanvasViewer pageIndex={nowPageIndex}></CanvasViewer>
                </Box>
              ) : (
                <Box w="100%" h="100%">
                  <Text>{relayRaceState[nowPageIndex].answer}</Text>
                </Box>
              )}
            </Box>
          ) : (
            <div></div>
          )}
        </LineNote>
      </Flex>
    </Flex>
  );
};

export default RelayRaceResult;
