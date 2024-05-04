import { useColorModeValue, useToast } from "@chakra-ui/react";
import { darkBgForm, lightBgForm } from "../../../../components/form/variables";
import { IClientById } from "../../../../types/client";
import ClientData from "../new/ClientData";
import { useForm } from "react-hook-form";
import { IFormSuscriptionData } from "../../../../types/suscription";
import SubscriptionEditionForm from "./SubscriptionEditionForm";
import { useEffect } from "react";
import ButtonsStack from "./ButtonsStack";
import { useNavigate } from "react-router-dom";
import { usePutSubscription } from "../../../../hooks/subscriptions";
import { subscriptionDataExtractor } from "../util";
import { getUserInfo } from "../../../../utilities";

interface ISubscriptionsEditionContainer {
  clientData: IClientById | undefined;
  subscriptionInfo: IFormSuscriptionData | undefined;
  subscriptionId: string | undefined;
}
const SubscriptionsEditionContainer = ({
  clientData,
  subscriptionInfo,
  subscriptionId,
}: ISubscriptionsEditionContainer) => {
  const navigate = useNavigate();
  const subscriptorInfo = getUserInfo();
  const toast = useToast();

  const { mutate: onMutationSubscription, isPending: isSubscriptionUpdate } =
    usePutSubscription();
  const {
    formState: { errors },
    control,
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
  } = useForm<IFormSuscriptionData>();
  const subsTypePrice = watch("subscriptionType");

  const bgContainer = useColorModeValue(lightBgForm, darkBgForm);

  useEffect(() => {
    if (subscriptionInfo) {
      reset(subscriptionInfo);
    }
  }, [reset, subscriptionInfo]);

  const onSubscriptionUpdate = (values: IFormSuscriptionData) => {
    if (!clientData || !subscriptorInfo || !subscriptionId) return;

    const { transactionAmmount, totalAmmount, ...restSubscriptionData } =
      subscriptionDataExtractor(values);
    onMutationSubscription(
      {
        ...restSubscriptionData,
        transactionAmmount: Number(transactionAmmount),
        totalAmmount: Number(totalAmmount),
        id: Number(subscriptionId),
        clientId: clientData.id,
        subscriptorId: subscriptorInfo.id,
      },
      {
        onSuccess: (response) => {
          toast({
            title: `Edición exitosa`,
            description: response.message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        },
        onError: (error) => {
          toast({
            title: `Error en edición`,
            description: error.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        },
      }
    );
  };
  const handleCancel = () => {
    navigate(-1);
  };

  const handleDiscardChanges = () => {
    if (subscriptionInfo) {
      reset(subscriptionInfo);
    }
  };

  return (
    <>
      <ClientData clientsData={clientData} bgContainer={bgContainer} />
      <form onSubmit={handleSubmit(onSubscriptionUpdate)}>
        <SubscriptionEditionForm
          bgContainer={bgContainer}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          subsTypePrice={subsTypePrice}
          handleDiscardChanges={handleDiscardChanges}
        />
        <ButtonsStack
          handleCancel={handleCancel}
          isSubscriptionUpdate={isSubscriptionUpdate}
        />
      </form>
    </>
  );
};

export default SubscriptionsEditionContainer;
