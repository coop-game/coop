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
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";

type ChakraModalPropsType = {
  children?: React.ReactNode;
  onCloseHandler: () => void;
};

const ChakraModal = ({ children, onCloseHandler }: ChakraModalPropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const initialRef = React.useRef(null);

  const onCloseAllHandler = () => {
    onClose();
    onCloseHandler();
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onCloseAllHandler}
      >
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
              다음
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChakraModal;
