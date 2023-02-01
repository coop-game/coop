import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { yjsRelayRaceAnswerState } from "@common/recoil/recoil.atom";
import { doc } from "@common/yjsStore/userStore";
import Progress from "@components/Progress";
import { CPGameRelayRaceAnswer } from "@types";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CanvasViewer from "@components/CanvasViewer";
import { css } from "@emotion/react";
import { userState } from "@common/recoil/recoil.atom";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const AnswerInput = ({
  pushArrayHandler,
  gamepageIndex,
  startTime,
}: {
  pushArrayHandler: (element: CPGameRelayRaceAnswer) => void;
  gamepageIndex: number;
  startTime: number;
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [relayRaceAnswerState, setState] = useRecoilState<
    CPGameRelayRaceAnswer[]
  >(yjsRelayRaceAnswerState);
  const user = useRecoilValue(userState);
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClick = async () => {
    doc.transact(() => {
      const temp: CPGameRelayRaceAnswer = {
        answer: answer,
        id: doc.clientID,
        nickname: user.nickname,
        isDraw: false,
        avatarIndex: user.avatarIndex,
        color: user.color,
      };
      pushArrayHandler(temp);
    });
    setAnswer("");
  };
  return (
    <Flex width="100%" height="100%" flexDirection={"column"}>
      <Progress
        time={50000}
        callback={onClick}
        play={"running"}
        startTime={startTime}
      />
      <Flex width="100%" padding={"3%"} flexDirection="column">
        {relayRaceAnswerState.length > 0 && (
          <Box flexGrow="1" flexBasis="500px" width="100%">
            <CanvasViewer pageIndex={gamepageIndex - 1} />
          </Box>
        )}
      </Flex>
      <Text fontSize={"5xl"} fontWeight="bold">
        {t("relay.race.answer.suggest")}
      </Text>
      <Input
        placeholder={t("relay.race.answer.input.placeholder")}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        value={answer}
      ></Input>
      <Button onClick={onClick}>{t("relay.race.answer.submit")}</Button>
    </Flex>
  );
};

export default AnswerInput;
