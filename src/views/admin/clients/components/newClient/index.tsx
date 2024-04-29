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
import { useNavigate } from "react-router-dom";
import {
  darkBgForm,
  darkTextColor,
  lightBgForm,
  lightTextColor,
} from "../../../../../components/form/variables";

import { Select as CkakraSelect } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGenre } from "../../../../../hooks/genre";
import { useClient } from "../../../../../hooks/client";
import { IClientRequestBody } from "../../../../../types/client";
import DragAndDropInput from "../DragAndDropInput";
import { parseToFormdata } from "../utils";

const NewClient = () => {
  const navigate = useNavigate();
  const formBg = useColorModeValue(lightBgForm, darkBgForm);
  const textColor = useColorModeValue(lightTextColor, darkTextColor);
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File | null>(null);

  const toast = useToast();

  const { data: genres } = useGenre();

  // const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     console.log(event.target.files[0], "la foto desde el otro lado ");
  //     setImage(URL.createObjectURL(event.target.files[0]));
  //   }
  // };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IClientRequestBody>();

  const { mutate: onClientMutate } = useClient();

  const onSubmitClient = handleSubmit((values: IClientRequestBody) => {
    onClientMutate(
      {
        bodyData: parseToFormdata({ values, file }),
      },
      {
        onSuccess: () => {
          toast({
            title: `Registro de Cliente`,
            description: `Datos guardados exitosamente!`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          reset();
          setImage(undefined);
          setFile(null);
        },
        onError: (error) => {
          toast({
            title: "Registro de Cliente",
            description: `Ups! Algo salió mal ${error?.message}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  });

  useEffect(() => {
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <Box pt={{ base: marginTopMobile, md: "80px", xl: marginTopDefault }}>
      <Box px="1rem">
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
            Nuevo Cliente
          </Text>
        </Flex>
        <Box bgColor={formBg} borderRadius={8} p={4}>
          <form onSubmit={onSubmitClient}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
              <FormControl isInvalid={!!errors.ci}>
                <FormLabel display="flex" gap={1}>
                  Nro Cedula <Text color="brand.500">*</Text>
                </FormLabel>
                <Input
                  id="ci"
                  type="text"
                  {...register("ci", {
                    required: {
                      value: true,
                      message: "El carnet es requerido",
                    },
                  })}
                  placeholder="Cedula.."
                  color={textColor}
                />
                {errors && errors.ci && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.ci.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.firstname}>
                <FormLabel display="flex" gap={1}>
                  Nombre(s) <Text color="brand.500">*</Text>
                </FormLabel>
                <Input
                  id="firstname"
                  type="text"
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                  })}
                  color={textColor}
                  placeholder="Nombres"
                />
                {errors && errors.firstname && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.firstname.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.lastname}>
                <FormLabel display="flex" gap={1}>
                  Apellido(s)<Text color="brand.500">*</Text>
                </FormLabel>
                <Input
                  id="lastname"
                  type="text"
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "El apellido es requerido",
                    },
                  })}
                  color={textColor}
                  placeholder="Apellido"
                />
                {errors && errors.lastname && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.lastname.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input
                  id="birthdate"
                  type="date"
                  {...register("birthdate")}
                  color={textColor}
                />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
              <FormControl isInvalid={!!errors.genre}>
                <FormLabel display="flex" gap={1}>
                  Genero<Text color="brand.500">*</Text>
                </FormLabel>
                <Controller
                  name="genre"
                  rules={{
                    required: {
                      value: true,
                      message: "El genero es requerido",
                    },
                  }}
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
                      // isDisabled={!isEditing}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      focusBorderColor="brand.400"
                      isClearable
                    />
                  )}
                />
                {errors && errors.genre && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.genre.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Correo</FormLabel>
                <Input
                  id="email"
                  type="text"
                  {...register("email")}
                  color={textColor}
                  placeholder="Correo"
                />
              </FormControl>
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel display="flex" gap={1}>
                  Celular <Text color="brand.500">*</Text>
                </FormLabel>
                <Input
                  id="phone"
                  type="number"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "El telefono es requerido",
                    },
                    maxLength: {
                      value: 10,
                      message:
                        "El numero de celular no debe tener mas de 10 digitos",
                    },
                  })}
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
                  <NumberInputField {...register("height")} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Peso</FormLabel>
                <NumberInput defaultValue={50.5} precision={2} step={0.1}>
                  <NumberInputField {...register("weight")} />
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
                isLoading={isSubmitting}
                type="submit"
                color="white"
              >
                Registrar
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default NewClient;
