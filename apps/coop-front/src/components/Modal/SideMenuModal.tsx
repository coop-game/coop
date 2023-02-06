import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  ModalCloseButton,
  ModalFooter,
  Input,
  FormLabel,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { userProfilesState } from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useTranslation } from "next-i18next";

type SideMenuModalPropsType = {
  children?: React.ReactNode;
};

const SideMenuModal = ({ children }: SideMenuModalPropsType) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const { t } = useTranslation("common");
  const { isOwner } = useRecoilValue(userProfilesState);

  const onCloseAllHandler = () => {
    onClose();
  };

  const backgroundColor = useColorModeValue("#e2e0a5", "#ADAC9A");
  const color = useColorModeValue("#504538", "#504538");
  const buttonBackgroundColor = useColorModeValue("#96aca8da", "#564d4fda");
  const buttonHoverBackgroundColor = useColorModeValue("#c5dedada", "#564d4f");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH={"80vh"} minW={"80vw"}>
          <ModalHeader
            css={css`
              background: ${backgroundColor};
              border-radius: 8px 8px 0px 0px;
            `}
          ></ModalHeader>
          <ModalBody
            pb={6}
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              background: ${backgroundColor};
              color: ${color};
            `}
          >
            {children}
          </ModalBody>
          <ModalFooter
            css={css`
              display: flex;
              justify-content: center;
              background: ${backgroundColor};
              border-radius: 0px 0px 8px 8px;
            `}
          >
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SideMenuModal;
