/** @jsxImportSource @emotion/react */
import { Box, Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
import MuteButton from "@components/Button/MuteButton";
import SideModalPortal from "./SideModalPortal";
import ToggleThemeButton from "@components/Button/ToggleThemeButton";
import LanguageButton from "@components/Button/LanguageButton";
import SliderBar from "@components/Button/SliderBar";

const SideMenuModal = () => {
  return (
    <>
      <SideModalPortal>
        <Flex
          css={css`
            height: 50%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 100px;
          `}
        >
          <MuteButton />
          <SliderBar
            audioId={"background_audio"}
            translationLabel="tooltip.background.sound"
          />
          <ToggleThemeButton />
          <LanguageButton />
        </Flex>
      </SideModalPortal>
    </>
  );
};

export default SideMenuModal;
