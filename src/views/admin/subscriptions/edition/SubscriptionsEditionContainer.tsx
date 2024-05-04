import { useColorModeValue } from "@chakra-ui/react";
import { darkBgForm, lightBgForm } from "../../../../components/form/variables";
import { IClientById } from "../../../../types/client";
import ClientData from "../new/ClientData";
import { useForm } from "react-hook-form";
import { IFormSuscriptionData } from "../../../../types/suscription";
import SubscriptionEditionForm from "./SubscriptionEditionForm";
import { useEffect } from "react";
import ButtonsStack from "./ButtonsStack";
import { useNavigate } from "react-router-dom";

interface ISubscriptionsEditionContainer {
  clientData: IClientById | undefined;
  subscriptionInfo: IFormSuscriptionData | undefined;
}
const SubscriptionsEditionContainer = ({
  clientData,
  subscriptionInfo,
}: ISubscriptionsEditionContainer) => {
  const navigate = useNavigate();
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
    console.log(values);
  };
  const handleCancel = () => {
    navigate(-1);
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
        />
        <ButtonsStack handleCancel={handleCancel} />
      </form>
    </>
  );
};

export default SubscriptionsEditionContainer;
