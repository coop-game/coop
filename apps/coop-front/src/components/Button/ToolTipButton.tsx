import { Tooltip } from "@chakra-ui/react";
import { css, SerializedStyles } from "@emotion/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

type TooltipButtonPropsType = {
  label: string;
  ns?: string;
  children?: React.ReactNode;
  emotionCss?: any;
};

const TooltipButton = ({
  label,
  ns = "common",
  children,
  emotionCss,
}: TooltipButtonPropsType) => {
  const { t } = useTranslation(ns);
  return (
    <Tooltip label={t(label)}>
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
          ${emotionCss};
        `}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default TooltipButton;
