import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";

const SliderBar = ({
  audioId,
  translationLabel,
}: {
  audioId: string;
  translationLabel: string;
}) => {
  const backgroundAudioRef = useRef(null);
  const { t } = useTranslation("common");
  const onChangehandler = (val: number) => {
    backgroundAudioRef.current.volume = val / 100;
  };

  useEffect(() => {
    backgroundAudioRef.current = document.getElementById(
      audioId
    ) as HTMLAudioElement | null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip label={t(translationLabel)}>
      <Box width="100%" paddingLeft={"10px"} paddingRight={"10px"}>
        <Slider
          aria-label="slider-ex-1"
          defaultValue={20}
          onChange={onChangehandler}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Tooltip>
  );
};
export default React.memo(SliderBar);
