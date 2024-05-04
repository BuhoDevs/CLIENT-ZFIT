import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  marginTopDefault,
  marginTopMobile,
} from "../../../../../layouts/contants";
import { useNavigate, useParams } from "react-router-dom";
import {
  darkBgForm,
  darkTextColor,
  lightBgForm,
  lightTextColor,
} from "../../../../../components/form/variables";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Select as CkakraSelect } from "chakra-react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaClient } from "./validations";

import { useGenre } from "../../../../../hooks/genre";
import {
  useClientByIdEdition,
  useClientUpdate,
} from "../../../../../hooks/client";
import DatePicker from "../../../../../components/calendar/SingleDatePicker";
import { useEffect, useState } from "react";
import { IClientByIdEdition } from "../../../../../types/client";
import moment from "moment";
import DragAndDropInput from "../DragAndDropInput";
import { parseToFormdataEditClient } from "../utils";

const EditClient = () => {
  const params = useParams();
  const { clientId } = params;
  const { data: client, isLoading } = useClientByIdEdition({
    clientId: Number(clientId),
    isReadyTofetch: Boolean(clientId),
  });

  const { data: genres } = useGenre();
  const toast = useToast();
  const navigate = useNavigate();
  const formBg = useColorModeValue(lightBgForm, darkBgForm);
  const textColor = useColorModeValue(lightTextColor, darkTextColor);
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File | null>(null);

  const { mutate: onMutationUpdate, isPending } = useClientUpdate();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IClientByIdEdition>({
    mode: "onChange",
    resolver: zodResolver(schemaClient),
  });

  useEffect(() => {
    if (client) {
      reset({
        ...client,
        birthdate: moment
          .utc(client.birthdate)
          .locale("es")
          .format("yyyy-MM-DD"),
      });
      setImage(client.photo);
    }
  }, [client, reset]);
  console.log("imagen", image);
  const onSubmit: SubmitHandler<IClientByIdEdition> = (
    values: IClientByIdEdition
  ) => {
    if (!clientId) return;
    onMutationUpdate(
      {
        bodyData: parseToFormdataEditClient({ values, file }),
        clientId: Number(clientId),
      },
      {
        onSuccess: ({ message }) => {
          toast({
            title: `Edicion de Cliente`,
            description: message,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          reset();
          setImage(undefined);
          setFile(null);
          navigate("/dashboard/clients");
        },
      }
    );
  };

  if (isLoading)
    return (
      <Box pt={{ base: marginTopMobile, md: "80px", xl: marginTopDefault }}>
        Loading...
      </Box>
    );

  return (
    <Box pt={{ base: marginTopMobile, md: "80px", xl: marginTopDefault }}>
      <Box px={1} mx={6}>
        <Flex alignItems="center" justifyContent="space-between">
          <Button
            borderRadius="none"
            borderBottom="1px solid transparent"
            fontSize="sm"
            fontWeight={400}
            variant="unstyled"
            onClick={() => navigate(-1)}
            _hover={{
              borderBottom: "1px solid gray",
            }}
          >
            👈🏻 Volver
          </Button>
          <Text align="center" fontSize="medium">
            Modificar Cliente
          </Text>
        </Flex>
        <Box bgColor={formBg} borderRadius={8} p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
              <FormControl isRequired isInvalid={!!errors.ci}>
                <FormLabel htmlFor="ci_label" display="flex" gap={1}>
                  Nro Cedula
                </FormLabel>
                <Input
                  {...register("ci")}
                  id="ci_label"
                  color={textColor}
                  placeholder="Cedula"
                />
                <FormErrorMessage>{errors.ci?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.firstname}>
                <FormLabel htmlFor="firstname_label" display="flex" gap={1}>
                  Nombre(s)
                </FormLabel>
                <Input
                  {...register("firstname")}
                  id="firstname_label"
                  color={textColor}
                  placeholder="Nombre(s)"
                />

                {errors && errors.firstname && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.firstname.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.lastname}>
                <FormLabel htmlFor="lastname_label" display="flex" gap={1}>
                  Apellido(s)
                </FormLabel>
                <Input
                  {...register("lastname")}
                  id="lastname_label"
                  color={textColor}
                  placeholder="Apellido(s)"
                />

                {errors && errors.lastname && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.lastname.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Controller
                  name="birthdate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      setDate={onChange}
                      date={value}
                      name="birthdate"
                    />
                  )}
                />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
              <FormControl isRequired isInvalid={!!errors.Genre}>
                <FormLabel display="flex" gap={1}>
                  Genero
                </FormLabel>
                <Controller
                  name="Genre"
                  control={control}
                  render={({
                    field: { value, onChange, onBlur, name, ref },
                  }) => (
                    <CkakraSelect
                      name={name}
                      ref={ref}
                      colorScheme="brandScheme"
                      options={genres || []}
                      selectedOptionColorScheme="brandScheme"
                      placeholder="Seleccionar"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      focusBorderColor="brand.400"
                      isClearable
                    />
                  )}
                />
                {errors && errors.Genre && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.Genre.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email_label">Correo</FormLabel>
                <Input
                  {...register("email")}
                  id="email_label"
                  color={textColor}
                  placeholder="Correo"
                />

                {errors && errors.email && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.email.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.phone}>
                <FormLabel htmlFor="phone_label" display="flex" gap={1}>
                  Celular
                </FormLabel>
                <Input
                  {...register("phone", { valueAsNumber: true })}
                  type="number"
                  id="phone_label"
                  color={textColor}
                  placeholder="Celular"
                />

                {errors && errors.phone && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.phone.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
              <FormControl>
                <FormLabel>Altura</FormLabel>
                <NumberInput defaultValue={1.5} precision={2} step={0.1}>
                  <NumberInputField
                    {...register("height", { valueAsNumber: true })}
                    color={textColor}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Peso</FormLabel>
                <NumberInput defaultValue={50.5} precision={2} step={0.1}>
                  <NumberInputField
                    {...register("weight", { valueAsNumber: true })}
                    color={textColor}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 1 }} spacing={2}>
              <Flex flexDirection="column" gap={2}>
                <FormLabel>Foto</FormLabel>
                <DragAndDropInput
                  file={file}
                  setFile={setFile}
                  setImage={setImage}
                  image={image}
                />
              </Flex>
            </SimpleGrid>
            <Flex justifyContent="flex-end" mt={3}>
              <Button
                colorScheme="brandScheme"
                fontWeight={400}
                fontSize="small"
                borderRadius={8}
                isLoading={isPending}
                type="submit"
                color="white"
              >
                Editar
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default EditClient;
