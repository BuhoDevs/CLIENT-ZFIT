import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
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
import { IClientRequestBody } from "../../../../../types/client";
import { SchemaClient } from "./validations";
import { useClientId } from "../../../../../hooks/client";
import { useGenre } from "../../../../../hooks/genre";

const EditClient = () => {
  const params = useParams();
  const { clientId = "0" } = params;
  const { data, isLoading } = useClientId(+clientId);
  const { data: genres } = useGenre();

  const navigate = useNavigate();
  const formBg = useColorModeValue(lightBgForm, darkBgForm);
  const textColor = useColorModeValue(lightTextColor, darkTextColor);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IClientRequestBody>({
    resolver: zodResolver(SchemaClient),
  });

  const onSubmit: SubmitHandler<IClientRequestBody> = (
    data: IClientRequestBody
  ) => console.log(data);

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
              <FormControl isInvalid={!!errors.ci}>
                <FormLabel display="flex" gap={1}>
                  Nro Cedula <Text color="brand.500">*</Text>
                </FormLabel>
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={field.onChange}
                      color={textColor}
                      placeholder="Cedula"
                    />
                  )}
                  name="ci"
                  control={control}
                  defaultValue={data?.Person.ci}
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
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      color={textColor}
                      placeholder="Nombre(s)"
                    />
                  )}
                  name="firstname"
                  control={control}
                  defaultValue={data?.Person.firstname}
                />

                {errors && errors.firstname && (
                  <FormErrorMessage ps={1} mb="24px">
                    {errors.firstname.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.lastname}>
                <FormLabel display="flex" gap={1}>
                  Apellido(s) <Text color="brand.500">*</Text>
                </FormLabel>
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      color={textColor}
                      placeholder="Apellido(s)"
                    />
                  )}
                  name="lastname"
                  control={control}
                  defaultValue={data?.Person.lastname}
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
                  placeholder="Fecha de nacimiento"
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
