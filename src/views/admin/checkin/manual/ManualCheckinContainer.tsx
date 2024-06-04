import {
  Box,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { darkBgForm, lightBgForm } from "../../../../components/form/variables";
import {
  useCheckinPost,
  useCurrentSubscriptionsByCi,
} from "../../../../hooks/subscriptions";
import CheckinCard from "./Checkincard";
import {
  ICurrentSubscriptionsResponse,
  IPostCheckin,
} from "../../../../types/suscription";
import { OverlaySpinner } from "../../../../components/spinner/OverlaySpinner";

const ManualCheckinContainer = () => {
  const toast = useToast();
  const { onOpen, onClose } = useDisclosure();

  const bgContainer = useColorModeValue(lightBgForm, darkBgForm);
  const [ci, setCi] = useState("");
  const [clientAndSubsLocalState, setClientAndSubsLocalState] =
    useState<ICurrentSubscriptionsResponse>();

  const { mutate: onCheckinMutate, isPending: isCheckinPending } =
    useCheckinPost();

  const { data: ClientAndSubscriptionData, isRefetching } =
    useCurrentSubscriptionsByCi({
      ci,
      isReadyToFetch: Boolean(ci && ci.length === 7),
    });

  const onHandleSubmit = (values: { ci: string }) => {
    setCi(values.ci);
  };

  useEffect(() => {
    return () => {
      setCi("0000000");
      setTimeout(() => {
        setCi("");
      }, 0);
    };
  }, []);

  useEffect(() => {
    if (ClientAndSubscriptionData || isRefetching) {
      setClientAndSubsLocalState(ClientAndSubscriptionData);
    } else {
      setClientAndSubsLocalState(undefined);
    }
  }, [ClientAndSubscriptionData, isRefetching]);

  const resetCheckinValues = () => {
    setCi("");
    setClientAndSubsLocalState(undefined);
  };

  const onDisciplineCheckin = ({ ci, subscriptionId }: IPostCheckin) => {
    onCheckinMutate(
      {
        ci,
        subscriptionId,
      },
      {
        onSuccess: ({ message }) => {
          toast({
            title: `Asistencia`,
            description: message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          resetCheckinValues();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: async (error: any) => {
          resetCheckinValues();
          toast({
            title: `Error en Asistencia`,
            description: error?.response?.data?.message || "Ocurrio un error",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <>
      <Box p={1} bg={bgContainer} borderRadius={8}>
        <CheckinCard
          gridArea="1 / 1 / 2 / 2"
          onHandleSubmit={onHandleSubmit}
          ciValue={ci}
          ClientAndSubscriptionData={clientAndSubsLocalState}
          onDisciplineCheckin={onDisciplineCheckin}
        />
      </Box>
      {isCheckinPending && (
        <OverlaySpinner
          bgContainer={bgContainer}
          isOpen={isCheckinPending}
          onClose={onClose}
          onOpen={onOpen}
        />
      )}
    </>
  );
};

export default ManualCheckinContainer;
