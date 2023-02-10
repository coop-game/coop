/** @jsxImportSource @emotion/react */
import { Button, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { soundVolumeState } from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
const MuteButton = () => {
  const [soundVolume, setSoundVolume] = useRecoilState(soundVolumeState);
  const { t } = useTranslation("common");
  const onClickHandler = (e: any) => {
    e.preventDefault();
    setSoundVolume((prev) => !prev);
  };
  return (
    <>
      <Tooltip
        label={t(
          soundVolume ? "tooltip.sound.up.hover" : "tooltip.sound.mute.hover"
        )}
      >
        <button
          css={css`
            width: 40px;
            height: 40px;
            border-radius: 100%;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: -2px -2px 3px #0000006c, 3px 3px 5px #00000049;
            &:hover {
              box-shadow: inset -2px -2px 4px #00000071,
                inset 2px 2px 4px #0000004b;
            }

            & > .visible {
              display: block;
            }
            & > .invisible {
              display: none;
            }
          `}
          onClick={onClickHandler}
        >
          <Image
            className={`${soundVolume === true ? "visible" : "invisible"}`}
            src={"/images/volume/volume-up.svg"}
            width={30}
            height={30}
            alt={"volume up"}
          ></Image>
          <Image
            className={`${soundVolume === false ? "visible" : "invisible"}`}
            src={"/images/volume/volume-mute.svg"}
            width={30}
            height={30}
            alt={"volume mute"}
          ></Image>
        </button>
      </Tooltip>
    </>
  );
};
export default MuteButton;
