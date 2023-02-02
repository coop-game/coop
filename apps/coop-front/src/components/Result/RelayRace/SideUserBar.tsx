import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import AvatarImage from "@components/Result/AvatarImage";
import PostIt from "@components/layout/PostIt/PostIt";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const SideUserBar = ({ nowPageIndex }: { nowPageIndex: number }) => {
  const { userProfiles } = useRecoilValue(userProfilesSelector);
  const relayRaceState = useRecoilValue<CPGameRelayRaceAnswer[]>(
    yjsRelayRaceAnswerState
  );
  const { colorMode } = useColorMode();
  return (
    <Flex
      w="100%"
      h="100%"
      maxH={{ base: "200px", lg: "400px" }}
      justifyContent={"center"}
      // alignItems="center"
      position={"relative"}
      flexDirection="column"
    >
      <Flex justifyContent={"center"} alignItems="center" w="100%" h="10%">
        <Text fontSize={{ base: "1.5rem", lg: "2rem" }}>정답자</Text>
      </Flex>
      <Box w="100%" h="80%" maxH={{ base: "200px", lg: "400px" }}>
        <Flex
          w={"100%"}
          h="75%"
          alignItems={"center"}
          flexDirection="column"
          position={"absolute"}
          bgColor={colorMode === "light" ? "#E2E0A5" : "#b3b18a"}
          overflow="hidden"
          boxShadow={"dark-lg"}
          borderRadius="8px"
        >
          <motion.div
            animate={{
              y: `${+nowPageIndex * -100 + 10}%`,
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
                flex-direction: column;
                height: ${100 * userProfiles.length}%;
                width: 100%;
              `}
            >
              {Object.keys(relayRaceState).map((e, i) => (
                <Flex key={i} w={"100%"} h={"100%"} direction={"column"}>
                  <AvatarImage userProfile={relayRaceState[e]} />
                </Flex>
              ))}
            </div>
          </motion.div>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SideUserBar;
