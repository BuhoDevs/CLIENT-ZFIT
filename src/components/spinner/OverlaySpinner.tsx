import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";

interface IOverlaySpinner {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  bgContainer: string;
}

export function OverlaySpinner({
  isOpen,
  onClose,
  bgContainer,
}: IOverlaySpinner) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Marcando asistencia...</ModalHeader>
          <ModalBody pb={6} textAlign="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color={bgContainer}
              size="xl"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
