import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { darkBgForm, lightBgForm } from "../../../../components/form/variables";
import ClientData from "./ClientData";
import SubscriptionData from "./SubscriptionData";
import { IClientById } from "../../../../types/client";
import { useForm } from "react-hook-form";

interface INewsubscriptionContainer {
  clientsData: IClientById | undefined;
}
const NewsubscriptionContainer = ({
  clientsData,
}: INewsubscriptionContainer) => {
  const bgContainer = useColorModeValue(lightBgForm, darkBgForm);
  const { control, register, watch, getValues, setValue, handleSubmit } =
    useForm();
  const subsTypePrice = watch("subscriptionType");
  const transactionAmmount = watch("transactionAmmount");
  console.log(getValues());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubscription = (values: any) => {
    console.log(values, "VALORES");
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
          >
            Suscribir
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default NewsubscriptionContainer;
