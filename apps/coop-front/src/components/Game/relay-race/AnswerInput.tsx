import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { yjsRelayRaceAnswerState } from "@common/recoil/recoil.atom";
import { doc } from "@common/yjsStore/userStore";
import Progress from "@components/Game/common/Progress";
import { CPGameRelayRaceAnswer } from "@types";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CanvasViewer from "@components/Tldraw/CanvasViewer";
import { userState } from "@common/recoil/recoil.atom";
import { useTranslation } from "next-i18next";
import { regex } from "@common/regex";

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
  const { t } = useTranslation("common");
  const [answerPassState, setAnswerPassState] = useState<boolean | undefined>(
    undefined
  );

  const onClick = async () => {
    if (answerPassState) {
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
    } else {
    }
  };

  useEffect(() => {
    if (
      regex.test(answer) &&
      answer.trim().length > 0 &&
      answer.trim().length <= 20
    ) {
      setAnswerPassState(true);
    } else {
      setAnswerPassState(false);
    }
  }, [answer]);

  return (
    <Flex width="100%" height="100%" flexDirection={"column"}>
      <Progress
        time={20000}
        callback={() => {
          doc.transact(() => {
            const temp: CPGameRelayRaceAnswer = {
              answer: " ",
              id: doc.clientID,
              nickname: user.nickname,
              isDraw: false,
              avatarIndex: user.avatarIndex,
              color: user.color,
            };
            pushArrayHandler(temp);
          });
        }}
        play={"running"}
        startTime={startTime}
      />
      <Flex width="100%" padding={"2%"} flexDirection="column">
        {relayRaceAnswerState.length > 0 && (
          <Box
            flexGrow="1"
            flexBasis={{ sm: "300px", md: "500px" }}
            width="100%"
          >
            <CanvasViewer pageIndex={gamepageIndex - 1} />
          </Box>
        )}
      </Flex>
      {gamepageIndex > 1 ? (
        <Text
          fontSize={{ base: "md", md: "5xl" }}
          fontWeight="bold"
          textAlign={"center"}
        >
          {t("relay.race.answer.relay.input")}
        </Text>
      ) : (
        <Text
          fontSize={{ base: "md", md: "5xl" }}
          fontWeight="bold"
          textAlign={"center"}
        >
          {t("relay.race.answer.suggest")}
        </Text>
      )}
      <Text fontSize={"sm"}>{t("relay.race.answer.alert")}</Text>
      <Input
        placeholder={t("relay.race.answer.input.placeholder")}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        value={answer}
        marginBottom="3%"
      ></Input>
      <Flex w="100%" justifyContent={"center"}>
        <Button width={"15%"} minW="150px" onClick={onClick}>
          {t("relay.race.answer.submit")}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AnswerInput;
