import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  darkBgForm,
  darkTextColor,
  lightBgForm,
  lightTextColor,
} from "../../../../../../components/form/variables";
import { useEffect, useState } from "react";
import {
  IClientDataFilters,
  IClientDataTable,
} from "../../../../../../types/client";
import { useForm } from "react-hook-form";
import { useAllClients } from "../../../../../../hooks/client";
import { ColumnDef } from "@tanstack/react-table";
import CustomHeaderColumn from "../../Table/CustomHeaderColumn";
import { stateDiccionary } from "../../Table/utils";
import { StateDiccionaryProps } from "../../../../../../types/table";
import { MdSearch } from "react-icons/md";
import { DataTable } from "../../Table/DataTable";
import { useNavigate } from "react-router-dom";

const intialFilters: IClientDataFilters = {
  ci: "",
  firstname: "",
  lastname: "",
};

const Clients = () => {
  const navigate = useNavigate();
  const bgTableContainer = useColorModeValue(lightBgForm, darkBgForm);
  const textColor = useColorModeValue(lightTextColor, darkTextColor);
  const [filters, setFilters] = useState<IClientDataFilters>(intialFilters);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClientDataFilters>();
  const { mutate: getClients, isPending: areClientsFetching } = useAllClients();
  const [clientsData, setClientsData] = useState<IClientDataTable[]>();
  const [clientSelected, setClientSelected] = useState<IClientDataTable>();

  useEffect(() => {
    getClients(
      {
        clientData: filters,
        skip: 1,
        take: 10,
      },
      {
        onSuccess: (clienscollection) => {
          setClientsData(clienscollection);
        },
      }
    );
  }, [filters, getClients]);

  const columns: ColumnDef<IClientDataTable>[] = [
    {
      header: "FOTO",
      accessorKey: "photo",
      cell: ({ row }) => (
        <Avatar
          size="sm"
          name={row.original.firstname}
          src={row.original.photo}
        />
      ),
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CEDULA" />
      ),
      accessorKey: "ci",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="NOMBRES" />
      ),
      accessorKey: "firstname",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="APELLIDOS" />
      ),
      accessorKey: "lastname",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="TELEFONO" />
      ),
      accessorKey: "phone",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CORREO" />
      ),
      accessorKey: "email",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="ESTADO" />
      ),
      accessorFn: (row) =>
        stateDiccionary[String(row.status) as keyof StateDiccionaryProps],
      accessorKey: "status",
    },
  ];

  const onSearchClients = (values: IClientDataFilters) => {
    setFilters(values);
  };

  useEffect(() => {
    if (clientSelected) navigate(`/dashboard/clients/${clientSelected.id}`);
  }, [clientSelected, navigate]);

  return (
    <>
      <Box p={1} bg={bgTableContainer} mb={4} borderRadius={8}>
        <form onSubmit={handleSubmit(onSearchClients)}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} p={4} spacing={2}>
            <FormControl>
              <FormLabel>Cédula</FormLabel>
              <Input
                {...register("ci", {
                  maxLength: {
                    value: 10,
                    message: "Debe contener como máximo 10 caracteres",
                  },
                })}
                fontSize="small"
                type="text"
                placeholder="Cedula..."
                color={textColor}
              />
            </FormControl>
            <FormControl isInvalid={!!errors.firstname}>
              <FormLabel>Nombre(s)</FormLabel>
              <Input
                {...register("firstname", {
                  minLength: {
                    value: 3,
                    message: "Debe tener al menos 3 caracteres",
                  },
                })}
                fontSize="small"
                type="text"
                placeholder="Nombre(s)"
                color={textColor}
              />
              {errors?.firstname && (
                <FormErrorMessage>{errors.firstname.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.lastname}>
              <FormLabel>Apellido(s)</FormLabel>
              <Input
                {...register("lastname", {
                  minLength: {
                    value: 3,
                    message: "Debe tener al menos 3 caracteres",
                  },
                })}
                fontSize="small"
                type="text"
                placeholder="Apellidos"
                color={textColor}
              />
              {errors?.lastname && (
                <FormErrorMessage>{errors.lastname.message}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
          <Flex justifyContent="flex-end" alignItems="center">
            <Button
              width={{ base: "full", md: "150px" }}
              leftIcon={<MdSearch fontSize={16} />}
              borderRadius="8px"
              colorScheme="brandScheme"
              fontSize="sm"
              fontWeight="normal"
              color="white"
              type="submit"
            >
              Buscar
            </Button>
          </Flex>
        </form>
      </Box>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
        bg={bgTableContainer}
      >
        <DataTable
          columns={columns}
          isFetching={false}
          isLoading={areClientsFetching}
          data={clientsData}
          tableSize="md"
          // tableVariant="striped"
          setSelectedItem={setClientSelected}
          tableVariant="simple"
        />
      </SimpleGrid>
    </>
  );
};
export default Clients;
