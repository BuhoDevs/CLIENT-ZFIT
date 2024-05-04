import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IFormSuscriptionData } from "../../../../types/suscription";
import { Select as CkakraSelect } from "chakra-react-select";
import { useDisciplines } from "../../../../hooks/disciplines";
import { useAllSubscriptionsType } from "../../../../hooks/subscriptionsType";
import DatePicker from "../../../../components/calendar/SingleDatePicker";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../../components/form/variables";

interface ISubscriptionEditionForm {
  bgContainer: string;
  errors: FieldErrors<IFormSuscriptionData>;
  control: Control<IFormSuscriptionData>;
  setValue: UseFormSetValue<IFormSuscriptionData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subsTypePrice: any;
  register: UseFormRegister<IFormSuscriptionData>;
  handleDiscardChanges: () => void;
}
const SubscriptionEditionForm = ({
  bgContainer,
  errors,
  control,
  setValue,
  subsTypePrice,
  register,
  handleDiscardChanges,
}: ISubscriptionEditionForm) => {
  const { data: disciplinesData } = useDisciplines();
  const { data: subscriptionsTypeData } = useAllSubscriptionsType();

  const brandBgColor = useColorModeValue(lightBrandBgColor, darkBrandBgColor);
  const inputTextColor = useColorModeValue("black", "white");

  return (
    <Box borderRadius={8} bg={bgContainer} mt={2} p={4}>
      <Flex justifyContent="flex-end">
        <Link
          color={brandBgColor}
          textDecoration="underline"
          onClick={handleDiscardChanges}
          w={{ base: "100%", sm: "auto" }}
          textAlign="center"
        >
          Descartar Cambios
        </Link>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
        <FormControl isInvalid={!!errors?.discipline}>
          <FormLabel display="flex" gap={1}>
            Disciplina<Text color="brand.500">*</Text>
          </FormLabel>
          <Controller
            name="discipline"
            rules={{
              required: {
                value: true,
                message: "La disciplina es requerida",
              },
            }}
            control={control}
            render={({ field: { value, onChange, onBlur, name, ref } }) => (
              <CkakraSelect
                name={name}
                ref={ref}
                colorScheme="brandScheme"
                options={disciplinesData || []}
                selectedOptionColorScheme="brandScheme"
                placeholder="Seleccionar"
                // isDisabled={!isEditing}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                focusBorderColor="brand.400"
                isClearable
              />
            )}
          />
          {errors?.discipline && (
            <FormErrorMessage ps={1} mb="24px">
              {errors.discipline.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.subscriptionType}>
          <FormLabel display="flex" gap={1}>
            Tipo Suscripción<Text color="brand.500">*</Text>
          </FormLabel>
          <Controller
            name="subscriptionType"
            rules={{
              required: {
                value: true,
                message: "El tipo de suscripción es requerido",
              },
            }}
            control={control}
            render={({ field: { value, onChange, onBlur, name, ref } }) => (
              <CkakraSelect
                name={name}
                ref={ref}
                colorScheme="brandScheme"
                options={subscriptionsTypeData || []}
                selectedOptionColorScheme="brandScheme"
                placeholder="Seleccionar"
                // isDisabled={!isEditing}
                onChange={(valueToChange) => {
                  if (!valueToChange) {
                    setValue("transactionAmmount", 0);
                    setValue("totalAmmount", 0);
                    setValue("outstanding", 0);
                  } else {
                    setValue("transactionAmmount", 0);
                    setValue("totalAmmount", valueToChange.price);
                    setValue("outstanding", Number(valueToChange.price));
                  }
                  onChange(valueToChange);
                }}
                onBlur={onBlur}
                value={value || ""}
                focusBorderColor="brand.400"
                isClearable
              />
            )}
          />
          {errors?.subscriptionType && (
            <FormErrorMessage ps={1} mb="24px">
              {errors.subscriptionType.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.dateIn}>
          <FormLabel display="flex" gap={1}>
            Fecha Inicio<Text color="brand.500">*</Text>
          </FormLabel>
          <Controller
            name="dateIn"
            control={control}
            rules={{
              required: {
                value: true,
                message: "La fecha es requerida",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                setDate={onChange}
                date={value}
                name="dateIn"
                // isMaxDateRequired
              />
            )}
          />
          {errors?.dateIn && (
            <FormErrorMessage ps={1} mb="24px">
              {errors.dateIn.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.dateOut}>
          <FormLabel display="flex" gap={1}>
            Fecha Final<Text color="brand.500">*</Text>
          </FormLabel>
          <Controller
            name="dateOut"
            control={control}
            rules={{
              required: {
                value: true,
                message: "La fecha es requerida",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <DatePicker setDate={onChange} date={value} name="dateOut" />
            )}
          />
          {errors?.dateOut && (
            <FormErrorMessage ps={1} mb="24px">
              {errors.dateOut.message}
            </FormErrorMessage>
          )}
        </FormControl>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
        <FormControl isInvalid={!!errors?.transactionAmmount}>
          <FormLabel>Monto a Pagar (Bs)</FormLabel>
          <Input
            type="number"
            isDisabled={!subsTypePrice}
            focusBorderColor={brandBgColor}
            {...register("transactionAmmount", {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange: ({ target: { value } }) => {
                setValue("outstanding", Number(subsTypePrice?.price - value));
              },
              required: {
                value: true,
                message: "El monto es requerido",
              },
              valueAsNumber: true,
              max: {
                value: subsTypePrice?.price,
                message: `El monto es mayor al costo (${subsTypePrice?.price})`,
              },
            })}
            color={inputTextColor}
          />

          {errors?.transactionAmmount && (
            <FormErrorMessage ps={1} mb="24px">
              {errors.transactionAmmount.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Costo Suscripción (Bs)</FormLabel>
          <Input
            readOnly
            focusBorderColor={brandBgColor}
            {...register("totalAmmount")}
            color={inputTextColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Saldo/Deuda (Bs)</FormLabel>
          <Input
            readOnly
            focusBorderColor={brandBgColor}
            {...register("outstanding")}
            color={inputTextColor}
          />
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default SubscriptionEditionForm;
