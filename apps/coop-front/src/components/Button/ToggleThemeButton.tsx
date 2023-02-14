/** @jsxImportSource @emotion/react */
import { Box, Button, css, Tooltip, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import Image from "next/image";
import { SlideMenuButtonLayout } from "@components/Modal/SideMenuModal";

const ToggleTheme = ({ color }: { color: string }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation("common");
  const onClickHandler = (e: any) => {
    e.preventDefault();
    toggleColorMode();
  };
  return (
    <>
      <SlideMenuButtonLayout>
        <Box color={color}>{t("side.menu.button.title.theme")}</Box>
        <Tooltip
          label={t(
            colorMode === "light"
              ? "tooltip.hover.lightmode"
              : "tooltip.hover.darkmode"
          )}
        >
          <button
            css={css`
              padding: 0;
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;

              width: 40px;
              height: 40px;
              border-radius: 100%;
              box-shadow: -2px -2px 3px #0000006c, 3px 3px 5px #00000049;
              &:hover {
                box-shadow: inset 2px 2px 4px #00000071,
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
              className={`${colorMode === "light" ? "visible" : "invisible"}`}
              src={"/images/svg/sun.svg"}
              width={30}
              height={30}
              alt={"sun"}
            ></Image>
            <Image
              className={`${colorMode === "dark" ? "visible" : "invisible"}`}
              src={"/images/svg/night.svg"}
              width={30}
              height={30}
              alt={"night"}
            ></Image>
          </button>
        </Tooltip>
      </SlideMenuButtonLayout>
    </>
  );
};
export default ToggleTheme;
