/** @jsxImportSource @emotion/react */
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { withTranslation } from "next-i18next";
import { css } from "@emotion/react";
import { Tooltip } from "@chakra-ui/react";

const LanguageButton = ({ t, i18n }) => {
  const router = useRouter();
  return (
    <Tooltip label={t("tooltip.hover.language")}>
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
      >
        <Image
          className={`${i18n.language === "ko" ? "visible" : "invisible"}`}
          width={40}
          height={40}
          src={"/images/svg/flag-ko.svg"}
          alt={"ko"}
          onClick={(e) => {
            e.preventDefault();
            i18n.changeLanguage("en");
            router.push(router.asPath, undefined, { locale: "en" });
          }}
        ></Image>
        <Image
          className={`${i18n.language === "en" ? "visible" : "invisible"}`}
          width={40}
          height={40}
          src={"/images/svg/flag-us.svg"}
          alt={"us"}
          onClick={(e) => {
            e.preventDefault();
            i18n.changeLanguage("ko");
            router.push(router.asPath, undefined, { locale: "ko" });
          }}
        ></Image>
      </button>
    </Tooltip>
  );
};

export default withTranslation("common")(LanguageButton);
