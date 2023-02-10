/** @jsxImportSource @emotion/react */
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";
import Image from "next/image";
import Chatting from "@components/Chat/Chatting";
import TooltipButton from "@components/Button/ToolTipButton";
import { useRecoilValue } from "recoil";
import { yjsGameState } from "@common/recoil/recoil.atom";

type ChattingModalPropsType = {
  children?: React.ReactNode;
  onCloseHandler?: () => void;
};

const ChattingModal = ({
  children,
  onCloseHandler,
}: ChattingModalPropsType) => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const onCloseAllHandler = () => {
    onClose();
    onCloseHandler && onCloseHandler();
  };

  const gameState = useRecoilValue(yjsGameState);

  const backgroundColor = useColorModeValue("#e2e0a5", "#ADAC9A");
  const color = useColorModeValue("#504538", "#504538");
  const buttonBackgroundColor = useColorModeValue("#C5DEDA", "#ADAC9A");
  return (
    <>
      {gameState?.isGameStart === true && (
        <>
          <Modal isOpen={isOpen} onClose={onCloseAllHandler}>
            <ModalOverlay />
            <ModalContent
              maxH={{ base: "100vh", md: "80vh" }}
              maxW={{ base: "100vw", md: "80vw" }}
              w={"100%"}
              h={"100%"}
            >
              <ModalHeader
                css={css`
                  background: ${backgroundColor};
                  border-radius: 8px 8px 0px 0px;
                  display: flex;
                  justify-content: flex-end;
                `}
              >
                <Image
                  width={20}
                  height={20}
                  src={"/images/svg/cross.svg"}
                  alt={"cross"}
                  onClick={onCloseAllHandler}
                ></Image>
              </ModalHeader>
              <ModalBody
                pb={6}
                css={css`
                  height: 100%;
                  width: 100%;
                  background: ${backgroundColor};
                  color: ${color};
                `}
              >
                <Chatting />
              </ModalBody>
              <ModalFooter
                css={css`
                  display: flex;
                  justify-content: center;
                  background: ${backgroundColor};
                  border-radius: 0px 0px 8px 8px;
                `}
              ></ModalFooter>
            </ModalContent>
          </Modal>
          <TooltipButton
            label={"tooltip.hover.message"}
            emotionCss={css`
              background: ${buttonBackgroundColor};
            `}
          >
            <Image
              width={30}
              height={30}
              src={"/images/svg/message.svg"}
              onClick={onOpen}
              alt={"message"}
            />
          </TooltipButton>
        </>
      )}
    </>
  );
};
export default ChattingModal;
