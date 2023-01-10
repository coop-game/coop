import { Box } from "@chakra-ui/react";
import { yjsRelayRaceAnswerState } from "@common/recoil/recoil.atom";
import CanvasViewer from "@components/CanvasViewer";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const RelayRaceResult = ({ nowPageIndex }: { nowPageIndex: number }) => {
  const relayRaceState = useRecoilValue<CPGameRelayRaceAnswer[]>(
    yjsRelayRaceAnswerState
  );
  console.log(nowPageIndex);
  return (
    <Box w="100%" height="100%" overflow="hidden">
      <motion.div
        animate={{
          x: `${+nowPageIndex * 100}%`,
          scale: 1,
          rotate: 0,
        }}
        transition={{ ease: "easeOut", duration: 1 }}
        css={css`
          display: flex;
          height: 100%;
          width: fit-content;
          position: relative;
          left: 50%;
        `}
      >
        {Object.keys(relayRaceState).map((e, i) => (
          <Box w="1280px" height="100%" key={i}>
            {i % 2 === 0 ? (
              <Box w="100%" height="100%">
                {relayRaceState[i].answer}
              </Box>
            ) : (
              <Box w="100%" h="100%" position="relative">
                <CanvasViewer pageIndex={i} />
              </Box>
            )}
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default RelayRaceResult;
