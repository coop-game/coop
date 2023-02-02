import { Box, Flex, Text } from "@chakra-ui/react";
import { yjsRelayRaceAnswerState } from "@common/recoil/recoil.atom";
import CanvasViewer from "@components/CanvasViewer";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import SideUserBar from "./SideUserBar";
import LineNote from "@components/Paper/LineNote";
import { useTranslation } from "next-i18next";

const RelayRaceResult = ({ nowPageIndex }: { nowPageIndex: number }) => {
  const relayRaceState = useRecoilValue<CPGameRelayRaceAnswer[]>(
    yjsRelayRaceAnswerState
  );
  const { t } = useTranslation("common");
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
            <Flex w="100%" h="100%" justifyContent={"center"}>
              {relayRaceState[nowPageIndex].isDraw ? (
                <Flex w={"100%"} h={"100%"} justifyContent={"center"}>
                  <CanvasViewer pageIndex={nowPageIndex}></CanvasViewer>
                </Flex>
              ) : (
                <Flex
                  w="100%"
                  h="100%"
                  justifyContent={"center"}
                  flexDirection="column"
                >
                  <Flex w="100%" flex={3}>
                    <Text>{t("relay.race.draw.submit.answer")}</Text>
                  </Flex>
                  <Flex
                    w="100%"
                    flex={7}
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    <Text fontSize={"4xl"}>
                      {relayRaceState[nowPageIndex].answer}
                    </Text>
                  </Flex>
                </Flex>
              )}
            </Flex>
          ) : (
            <div></div>
          )}
        </LineNote>
      </Flex>
    </Flex>
  );
};

export default RelayRaceResult;
