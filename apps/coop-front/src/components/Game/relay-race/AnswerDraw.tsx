import { Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  userSelector,
  userState,
  yjsGameState,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import NewCursor, { CursorComponent } from "@components/Tldraw/NewCursor";
import Progress from "@components/Game/common/Progress";
import { Tldraw } from "@coop/draw";
import { css } from "@emotion/react";
import { useMultiplayerState } from "@hooks/useMultiplayerState";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import DrawEditor from "@components/Game/Drawee/DrawEditor";

function Editor({ pageIndex }: { pageIndex: number }) {
  const userState = useRecoilValue(userSelector);

  const { onMount, onChangePage, onUndo, onRedo, onChangePresence } =
    useMultiplayerState({
      provider: providerState?.provider,
      room: providerState?.room,
      customUserId: userState?.nickname,
      color: userState?.color,
      pageIndex: pageIndex,
    });

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      <Tldraw
        showMenu={false}
        showPages={false}
        onMount={onMount}
        onChangePage={onChangePage}
        onUndo={onUndo}
        onRedo={onRedo}
        // onChangePresence={onChangePresence}
        components={{ Cursor: NewCursor as CursorComponent }}
      />
    </div>
  );
}

const AnswerDraw = ({
  pushArrayHandler,
  gamepageIndex,
  startTime,
}: {
  pushArrayHandler: (element: CPGameRelayRaceAnswer) => void;
  gamepageIndex: number;
  startTime: number;
}) => {
  const RelayRaceAnswerState = useRecoilValue(yjsRelayRaceAnswerState);
  const user = useRecoilValue(userState);
  const router = useRouter();
  const { t } = useTranslation("common");
  const drawEnd = () => {
    const temp: CPGameRelayRaceAnswer = {
      id: doc.clientID,
      nickname: user.nickname,
      isDraw: true,
      avatarIndex: user.avatarIndex,
      color: user.color,
    };
    pushArrayHandler(temp);
  };
  return (
    <Box w="100%" h="100%">
      <Box w="100%" h={{ sm: "8%", md: "10%" }}>
        <Progress
          time={20000}
          callback={drawEnd}
          play={"running"}
          startTime={startTime}
        />
      </Box>
      <Flex
        w="100%"
        h={{ sm: "10%", md: "12%" }}
        justifyContent="center"
        alignItems={"center"}
      >
        {RelayRaceAnswerState.length > 0 && (
          <Flex
            w="100%"
            h={"100%"}
            justifyContent="center"
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Text fontSize={"xl"}>{t("relay.race.draw.answer")}</Text>
            <Box>
              <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold">
                {RelayRaceAnswerState[RelayRaceAnswerState.length - 1].answer}
              </Text>
            </Box>
          </Flex>
        )}
      </Flex>
      <Box w="100%" h={{ sm: "80%", md: "65%" }} position={"relative"}>
        <DrawEditor
          pageIndex={gamepageIndex}
          useOnChangePresence={false}
          useSideBarDraw={false}
        />
      </Box>
      <Flex
        w={"100%"}
        h={{ sm: "15%", md: "25%" }}
        justifyContent="center"
        alignItems={"center"}
      >
        <Button onClick={drawEnd}>{t("relay.race.draw.submit")}</Button>
      </Flex>
    </Box>
  );
};

export default AnswerDraw;
