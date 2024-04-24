import { Button, Flex, useColorModeValue, useToast } from "@chakra-ui/react";
import { darkBgForm, lightBgForm } from "../../../../components/form/variables";
import ClientData from "./ClientData";
import SubscriptionData from "./SubscriptionData";
import { IClientById } from "../../../../types/client";
import { useForm } from "react-hook-form";
import { usePostSubscription } from "../../../../hooks/subscriptions";
import { IFormSuscriptionData } from "../../../../types/suscription";
import { subscriptionDataExtractor } from "../util";
import { getUserInfo } from "../../../../utilities";
import { useNavigate } from "react-router-dom";

interface INewsubscriptionContainer {
  clientsData: IClientById | undefined;
}
const NewsubscriptionContainer = ({
  clientsData,
}: INewsubscriptionContainer) => {
  const toast = useToast();
  const navigate = useNavigate();
  const bgContainer = useColorModeValue(lightBgForm, darkBgForm);
  /** user From localstorage */
  const subscriptorInfo = getUserInfo();
  /** hooks invokes */
  const { mutate: onSubscriptionSubmmit, isPending: isSubscriptionSubmitting } =
    usePostSubscription();
  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormSuscriptionData>();
  const subsTypePrice = watch("subscriptionType");
  const transactionAmmount = watch("transactionAmmount");
  const onSubscription = (values: IFormSuscriptionData) => {
    if (!clientsData || !subscriptorInfo) return;

    const { transactionAmmount, totalAmmount, ...restSubscriptionData } =
      subscriptionDataExtractor(values);
    onSubscriptionSubmmit(
      {
        ...restSubscriptionData,
        transactionAmmount: Number(transactionAmmount),
        totalAmmount: Number(totalAmmount),
        clientId: clientsData.id,
        subscriptorId: subscriptorInfo.id,
      },
      {
        onSuccess: (response) => {
          toast({
            title: `Subscripción exitosa`,
            description: response.message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/dashboard/subscriptions");
        },
        onError: (result) => {
          toast({
            title: `Error en subscripción`,
            description: result.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          reset();
        },
      }
    );
  };
  return (
    <>
      <ClientData bgContainer={bgContainer} clientsData={clientsData} />
      <form onSubmit={handleSubmit(onSubscription)}>
        <SubscriptionData
          bgContainer={bgContainer}
          control={control}
          register={register}
          subsTypePrice={subsTypePrice}
          transactionAmmount={transactionAmmount}
          setValue={setValue}
          errors={errors}
        />
        <Flex mt={2} justifyContent="flex-end">
          <Button
            colorScheme="brandScheme"
            borderRadius={8}
            w={{
              base: "100%",
              sm: "100%",
              md: "120px",
            }}
            fontSize="small"
            fontWeight="normal"
            type="submit"
            color="white"
            isLoading={isSubscriptionSubmitting}
          >
            Suscribir
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default NewsubscriptionContainer;
