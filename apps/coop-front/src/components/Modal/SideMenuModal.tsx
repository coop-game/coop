/** @jsxImportSource @emotion/react */
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import MuteButton from "@components/Button/MuteButton";
import SideModalPortal from "./SideModalPortal";
import ToggleThemeButton from "@components/Button/ToggleThemeButton";
import LanguageButton from "@components/Button/LanguageButton";
import SliderBar from "@components/Button/SliderBar";

const SideMenuModal = () => {
  const color = useColorModeValue("#000000", "#000000");
  return (
    <>
      <SideModalPortal>
        <Flex
          css={css`
            height: 100%;
            flex-direction: column;
            align-items: center;
            padding-top: 20px;
            padding-bottom: 20px;
            gap: 50px;
          `}
        >
          <MuteButton color={color} />
          <SliderBar
            audioId={"background_audio"}
            titleLabel={"side.menu.button.title.sound"}
            color={color}
          />
          <ToggleThemeButton color={color} />
          <LanguageButton color={color} />
        </Flex>
      </SideModalPortal>
    </>
  );
};

export default SideMenuModal;

export const SlideMenuButtonLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex
      css={css`
        width: 100%;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      `}
    >
      {children}
    </Flex>
  );
};
