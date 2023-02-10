/** @jsxImportSource @emotion/react */
import {
  useDisclosure,
  useColorModeValue,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import ModalPortal from "./ModalPortal";
import Image from "next/image";

type SideModalPortalPropsType = {
  children?: React.ReactNode;
};

const SideModalPortal = ({ children }: SideModalPortalPropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const { t } = useTranslation("common");

  const backgroundColor = useColorModeValue("#C5DEDA", "#ADAC9A");

  return (
    <>
      <Tooltip label={t("tooltip.hover.setting")}>
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
            background-color: ${backgroundColor};
            box-shadow: -2px -2px 3px #0000006c, 3px 3px 5px #00000049;
            &:hover {
              box-shadow: inset 2px 2px 4px #00000071,
                inset 2px 2px 4px #0000004b;
            }
          `}
          onClick={() => {
            onOpen();
          }}
        >
          <Image
            src={"/images/svg/setting.svg"}
            width={30}
            height={30}
            alt={"setting"}
          />
        </button>
      </Tooltip>
      {isOpen && (
        <ModalPortal>
          <div
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            `}
          >
            <motion.div
              className="overlay"
              onClick={() => onClose()}
              css={css`
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: #000000b2;
                z-index: 10;
              `}
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.div
              css={css`
                position: absolute;
                top: 0;
                right: 0;
                height: 100%;
                width: 150px;
                z-index: 100;
                color: white;
                background: ${backgroundColor};
                border-radius: 8px 0px 0px 8px;
                padding-right: 50px;
              `}
              initial={{ x: 1000 }}
              animate={{ x: 50 }}
              exit={{ x: 0 }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.25,
                damping: 30,
                stiffness: 500,
                restDelta: 0.001,
              }}
            >
              <Flex
                boxShadow={"base"}
                css={css`
                  justify-content: flex-end;
                  /* justify-content: center; */
                  padding: 10px;
                  margin-bottom: 10px;
                `}
              >
                <Tooltip label={t("tooltip.hover.cross")}>
                  <Image
                    src={"/images/svg/cross.svg"}
                    width={25}
                    height={25}
                    alt={"cross"}
                    onClick={onClose}
                    css={css``}
                  ></Image>
                </Tooltip>
              </Flex>
              {children}
            </motion.div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};
export default SideModalPortal;
