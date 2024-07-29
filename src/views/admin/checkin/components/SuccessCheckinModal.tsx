import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { RefObject } from "react";
import { IPostResponse } from "../../../../types/suscription";
import moment from "moment";
import "moment/locale/es";

interface ISuccessCheckinModal {
  isOpen: boolean;
  onClose: () => void;
  initialRef?: RefObject<HTMLInputElement>;
  successResponse: IPostResponse;
  resetCheckinValues: () => void;
}
moment.locale("es");
const SuccessCheckinModal = ({
  //   initialRef,
  isOpen,
  onClose,
  successResponse,
  resetCheckinValues,
}: ISuccessCheckinModal) => {
  const bgCardModal = useColorModeValue("white", "navy.900");
  return (
    <Modal
      //   initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg={bgCardModal}>
        <ModalHeader>Asistencia</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <Text>Bienvenido: {successResponse.Client?.Person.firstname}</Text>
            <Text>Disciplina: {successResponse.discipline}</Text>

            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} mr={0} fontSize="lg">
              {successResponse.message}!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              <Alert status="info">
                <AlertIcon />
                {`Su suscripción vence: ${moment
                  .utc(successResponse.Subscription?.dateOut)
                  .locale("es")
                  .format("DD/MM/YYYY")}`}
              </Alert>
            </AlertDescription>
          </Alert>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              resetCheckinValues();
              onClose();
            }}
            borderRadius={8}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SuccessCheckinModal;
