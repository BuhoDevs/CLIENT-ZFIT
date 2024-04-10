import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  marginTopDefault,
  marginTopMobile,
} from "../../../../../layouts/contants";
import { useNavigate } from "react-router-dom";
import {
  darkBgForm,
  lightBgForm,
} from "../../../../../components/form/variables";

import { Select as CkakraSelect } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { MdClose } from "react-icons/md";

const genres = [
  { value: 1, label: "Masculino" },
  { value: 2, label: "Femenino" },
];

const NewClient = () => {
  const navigate = useNavigate();
  const formBg = useColorModeValue(lightBgForm, darkBgForm);
  const { control } = useForm();
  const [image, setImage] = useState<string>();

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

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
          <form>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
              <FormControl>
                <FormLabel display="flex" gap={1}>
                  Nro Cedula <Text color="brand.500">*</Text>
                </FormLabel>
                <Input type="text" placeholder="Cedula.." />
              </FormControl>
              <FormControl>
                <FormLabel display="flex" gap={1}>
                  Nombre(s) <Text color="brand.500">*</Text>
                </FormLabel>
                <Input type="text" placeholder="Nombres" required />
              </FormControl>
              <FormControl>
                <FormLabel display="flex" gap={1}>
                  Apellido(s)<Text color="brand.500">*</Text>
                </FormLabel>
                <Input type="text" placeholder="Apellido" />
              </FormControl>
              <FormControl>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input type="date" placeholder="Fecha de nacimiento" />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
              <FormControl>
                <FormLabel display="flex" gap={1}>
                  Genero<Text color="brand.500">*</Text>
                </FormLabel>
                <Controller
                  name="province"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  }}
                  render={({
                    field: { value, onChange, onBlur, name, ref },
                  }) => (
                    <CkakraSelect
                      name={name}
                      ref={ref}
                      colorScheme="brandScheme"
                      options={genres}
                      selectedOptionColor="brandScheme"
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
              </FormControl>
              <FormControl>
                <FormLabel>Correo</FormLabel>
                <Input type="text" placeholder="Correo" />
              </FormControl>
              <FormControl>
                <FormLabel display="flex" gap={1}>
                  Celular <Text color="brand.500">*</Text>
                </FormLabel>
                <Input type="number" placeholder="Celular" />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={4}>
              <FormControl>
                <FormLabel>Altura</FormLabel>
                <Input type="number" placeholder="Ejemplo: 1.75 mts" />
              </FormControl>
              <FormControl>
                <FormLabel>Peso</FormLabel>
                <Input type="number" placeholder="Ejemplo: 75.5 kg" />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2}>
              <Flex flexDirection="column" gap={2}>
                <FormLabel>Foto</FormLabel>
                {image && (
                  <Flex alignItems="flex-start" gap={1}>
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      objectFit="contain"
                      border="1px solid gray"
                      borderRadius={8}
                    />
                    <Icon
                      as={MdClose}
                      bgColor="red.500"
                      cursor="pointer"
                      borderRadius={6}
                      width="24px"
                      height="24px"
                      p={1}
                      onClick={() => setImage(undefined)}
                    />
                  </Flex>
                )}

                <Input
                  type="file"
                  placeholder="Foto"
                  onChange={onImageChange}
                />
              </Flex>
            </SimpleGrid>
            <Flex justifyContent="flex-end" mt={3}>
              <Button
                bgColor="brand.500"
                fontWeight={400}
                fontSize="small"
                borderRadius={8}
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
