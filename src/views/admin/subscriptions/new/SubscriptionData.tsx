import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Select as CkakraSelect } from "chakra-react-select";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import DatePicker from "../../../../components/calendar/SingleDatePicker";
import {
  darkBrandBgColor,
  lightBrandBgColor,
} from "../../../../components/form/variables";
import { useDisciplines } from "../../../../hooks/disciplines";
import { useAllSubscriptionsType } from "../../../../hooks/subscriptionsType";

interface ISubscriptionData {
  bgContainer: string;
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subsTypePrice: any;
  transactionAmmount: number;
  setValue: UseFormSetValue<FieldValues>;
}
const SubscriptionData = ({
  bgContainer,
  control,
  register,
  subsTypePrice,
  transactionAmmount = 0,
  setValue,
}: ISubscriptionData) => {
  const { data: disciplinesData } = useDisciplines();
  const { data: subscriptionsTypeData } = useAllSubscriptionsType();
  const brandBgColor = useColorModeValue(lightBrandBgColor, darkBrandBgColor);

  return (
    <Box borderRadius={8} bg={bgContainer} mt={2} p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
        <FormControl>
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
          {/* {errors && errors.genre && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.genre.message}
                  </FormErrorMessage>
                )} */}
        </FormControl>

        <FormControl>
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
                    setValue("totalAmmount", valueToChange.price);
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
          {/* {errors && errors.genre && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.genre.message}
                  </FormErrorMessage>
                )} */}
        </FormControl>

        <FormControl>
          <FormLabel display="flex" gap={1}>
            Fecha Inicio<Text color="brand.500">*</Text>
          </FormLabel>
          <Controller
            name="dateIn"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                setDate={onChange}
                date={value}
                name="dateIn"
                // isMaxDateRequired
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel display="flex" gap={1}>
            Fecha Final<Text color="brand.500">*</Text>
          </FormLabel>
          <Controller
            name="dateOut"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                setDate={onChange}
                date={value}
                name="dateOut"
                // isMaxDateRequired
              />
            )}
          />
        </FormControl>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
        <FormControl>
          <FormLabel>Monto a Pagar (Bs)</FormLabel>
          <NumberInput
            isDisabled={!subsTypePrice}
            min={0}
            defaultValue={0}
            // max={subsTypePrice?.price || 0}
          >
            <NumberInputField
              {...register("transactionAmmount", {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange: ({ target: { value } }) => {
                  setValue("outstanding", Number(subsTypePrice.price - value));
                },
              })}
            />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Costo Suscripción (Bs)</FormLabel>
          <Input
            readOnly
            focusBorderColor={brandBgColor}
            // value={subsTypePrice?.price || 0}
            {...register("totalAmmount")}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Saldo/Deuda (Bs)</FormLabel>
          <Input
            readOnly
            focusBorderColor={brandBgColor}
            {...register("outstanding")}
            // value={Number(subsTypePrice?.price - transactionAmmount) || 0}
          />
          {/* <NumberInput
            isReadOnly
            min={0}
            defaultValue={0}
            max={subsTypePrice?.price}
            focusBorderColor={brandBgColor}
          >
            <NumberInputField
              {...register("outstanding")}
              // value={Number(subsTypePrice?.price - transactionAmmount) || 0}
            />
          </NumberInput> */}
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default SubscriptionData;
