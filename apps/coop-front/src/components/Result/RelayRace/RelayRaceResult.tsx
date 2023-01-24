import { Box, Flex, Text } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import CanvasViewer from "@components/CanvasViewer";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import AvatarImage from "@components/Result/AvatarImage";

const RelayRaceResult = ({ nowPageIndex }: { nowPageIndex: number }) => {
  const relayRaceState = useRecoilValue<CPGameRelayRaceAnswer[]>(
    yjsRelayRaceAnswerState
  );
  return (
    <Box w="100%" height="100%" overflow={"hidden"} position={"absolute"}>
      <Flex
        w={"100%"}
        h={"70%"}
        border="2px"
        justifyContent="center"
        alignItems="center"
      >
        {relayRaceState[nowPageIndex] ? (
          <div
            css={css`
              width: 100%;
              height: 100%;
            `}
          >
            {relayRaceState[nowPageIndex].isDraw ? (
              <div
                css={css`
                  width: 100%;
                  height: 100%;
                `}
              >
                <Box w={"95%"} h={"95%"} position={"relative"}>
                  <CanvasViewer pageIndex={nowPageIndex}></CanvasViewer>
                </Box>
              </div>
            ) : (
              <div
                css={css`
                  width: 100%;
                  height: 100%;
                `}
              >
                <Text>{relayRaceState[nowPageIndex].answer}</Text>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </Flex>
      {relayRaceState[nowPageIndex] && (
        <AvatarImage userProfile={relayRaceState[nowPageIndex]} />
      )}

      {/* 
      <motion.div
      animate={{
        x: `${+nowPageIndex * -100}%`,
        scale: 1,
        rotate: 0,
      }}
      transition={{ ease: "easeOut", duration: 1 }}
      css={css`
      width: 100%;
      height: 100%;
      `}
      >
      <div
      css={css`
      position: relative;
      display: flex;
      height: 100%;
      width: ${100 * userProfiles.length}%;
      
      `}
      >
      {Object.keys(relayRaceState).map((e, i) => (
        <Flex key={i} w={"100%"} h={"100%"} direction={"column"}>
        <AvatarImage userProfile={relayRaceState[e]} />
        </Flex>
        ))}
        </div>
        </motion.div>
      */}
    </Box>
  );
};

export default RelayRaceResult;
