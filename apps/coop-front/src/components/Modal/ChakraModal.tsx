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
import React from "react";

type ChakraModalPropsType = {
  children?: React.ReactNode;
  onCloseHandler: () => void;
};

const ChakraModal = ({ children, onCloseHandler }: ChakraModalPropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        {`I'll receive focus on close`}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          onCloseHandler();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChakraModal;
