import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import AvatarImage from "@components/Game/Result/AvatarImage";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import { useTranslation } from "next-i18next";

const SideUserBar = ({ nowPageIndex }: { nowPageIndex: number }) => {
  const { userProfiles } = useRecoilValue(userProfilesSelector);
  const relayRaceState = useRecoilValue<CPGameRelayRaceAnswer[]>(
    yjsRelayRaceAnswerState
  );
  const { colorMode } = useColorMode();
  const { t } = useTranslation("common");
  return (
    <Flex
      w="100%"
      h="100%"
      maxH={{ base: "200px", lg: "400px" }}
      justifyContent={"center"}
      position={"relative"}
      flexDirection="column"
    >
      <Flex justifyContent={"center"} alignItems="center" w="100%" h="10%">
        <Text fontSize={{ base: "1.5rem", lg: "2rem" }}>
          {t("relay.race.result.answer.solver")}
        </Text>
      </Flex>
      {relayRaceState[nowPageIndex] !== undefined && (
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
            <AvatarImage userProfile={relayRaceState[nowPageIndex]} />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default SideUserBar;
