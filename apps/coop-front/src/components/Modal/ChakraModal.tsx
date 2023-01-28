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
} from "@chakra-ui/react";
import { userProfilesState } from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { useTranslation } from "next-i18next";

type ChakraModalPropsType = {
  children?: React.ReactNode;
  onCloseHandler: () => void;
};

const ChakraModal = ({ children, onCloseHandler }: ChakraModalPropsType) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const { t } = useTranslation("common");
  const initialRef = React.useRef(null);
  const { isOwner } = useRecoilValue(userProfilesState);

  const router = useRouter();

  const onCloseAllHandler = () => {
    onClose();
    onCloseHandler();
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent minH={"80vh"} minW={"80vw"}>
          <ModalHeader
            css={css`
              background: #e2e0a5;
            `}
          ></ModalHeader>
          <ModalBody
            pb={6}
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              background: #e2e0a5;
            `}
          >
            {children}
          </ModalBody>
          <ModalFooter
            css={css`
              display: flex;
              justify-content: center;
              background: #e2e0a5;
            `}
          >
            {isOwner && (
              <Button
                css={css`
                  width: 150px;
                  height: 50px;
                  padding: 20px;
                  color: white;
                  font-size: 1.5rem;
                  font-weight: 500;
                  background: #d3504a;
                  &:hover {
                    background: #dd726d;
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
export default ChakraModal;
