import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { SlideMenuButtonLayout } from "@components/Modal/SideMenuModal";

const SliderBar = ({
  audioId,
  titleLabel,
  color,
}: {
  audioId: string;
  titleLabel: string;
  color: string;
}) => {
  const backgroundAudioRef = useRef(null);
  const { t } = useTranslation("common");
  const [volume, setVolume] = useState(20);
  const [showTooltip, setShowTooltip] = useState(false);
  const onChangehandler = (val: number) => {
    backgroundAudioRef.current.volume = val / 100;
    setVolume(val);
  };

  useEffect(() => {
    backgroundAudioRef.current = document.getElementById(
      audioId
    ) as HTMLAudioElement | null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SlideMenuButtonLayout>
      <Box color={color}>{t(titleLabel)}</Box>
      <Box width="100%" paddingLeft={"10px"} paddingRight={"10px"}>
        <Slider
          id="slider"
          aria-label="slider-ex-1"
          colorScheme="teal"
          defaultValue={volume}
          onChange={onChangehandler}
          min={0}
          max={100}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="teal.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`${volume}%`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Box>
    </SlideMenuButtonLayout>
  );
};
export default React.memo(SliderBar);
