/** @jsxImportSource @emotion/react */
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
import React from "react";
import { useRecoilValue } from "recoil";
import { useTranslation } from "next-i18next";

type AnswerModalFromChakraPropsType = {
  children?: React.ReactNode;
  onCloseHandler: () => void;
};

const AnswerModalFromChakra = ({
  children,
  onCloseHandler,
}: AnswerModalFromChakraPropsType) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const { t } = useTranslation("common");
  const initialRef = React.useRef(null);
  const { isOwner } = useRecoilValue(userProfilesState);

  const router = useRouter();

  const onCloseAllHandler = () => {
    onClose();
    onCloseHandler();
  };

  const backgroundColor = useColorModeValue("#e2e0a5", "#ADAC9A");
  const color = useColorModeValue("#504538", "#504538");
  const buttonBackgroundColor = useColorModeValue("#96aca8da", "#564d4fda");
  const buttonHoverBackgroundColor = useColorModeValue("#c5dedada", "#564d4f");
  //#564D4F
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={() => {}}>
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
            {isOwner && (
              <Button
                boxShadow={"Base"}
                width={"150px"}
                height={"50px"}
                borderRadius={"8px"}
                p={"20px"}
                fontSize={"1.5rem"}
                fontWeight={"500"}
                bg={buttonBackgroundColor}
                css={css`
                  &:hover {
                    background: ${buttonHoverBackgroundColor};
                  }
                `}
                onClick={onCloseAllHandler}
              >
                {t("draw.modal.next")}
              </Button>
            )}
            {!isOwner && (
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 10px;
                  font-size: 2em;
                `}
              >
                <Spinner color="red.700" size="lg" />
                <div css={css``}>{t("draw.modal.next.wait.owner")}</div>
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AnswerModalFromChakra;
