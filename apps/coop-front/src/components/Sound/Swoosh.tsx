import { Button, css } from "@chakra-ui/react";
import { soundVolumeState } from "@common/recoil/recoil.atom";
import React, { forwardRef, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
const Swoosh = () => {
  const ref = useRef(null);
  const useVolume = useRecoilValue(soundVolumeState);
  return (
    <>
      <div
        className="swoosh_audio"
        css={css`
          visibility: hidden;
          opacity: 0;
          position: absolute;
        `}
      >
        <audio ref={ref} autoPlay controls loop={false} muted={!useVolume}>
          <source src={"/sound/Swoosh.mp3"} type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
};
export default React.memo(forwardRef(Swoosh));
