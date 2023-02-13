import { Button, css } from "@chakra-ui/react";
import { soundVolumeState } from "@common/recoil/recoil.atom";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
const BackgroundSound = () => {
  const useVolume = useRecoilValue(soundVolumeState);
  const ref = useRef(null);
  useEffect(() => {
    ref.current.volume = 0.2;
  }, []);
  return (
    <div
      className="background_audio"
      css={css`
        visibility: hidden;
        opacity: 0;
        position: absolute;
      `}
    >
      <audio
        ref={ref}
        id={"background_audio"}
        autoPlay
        controls
        loop={true}
        muted={!useVolume}
      >
        <source src={"/sound/pianoMan.mp3"} type="audio/mpeg" />
      </audio>
    </div>
  );
};
export default React.memo(forwardRef(BackgroundSound));
