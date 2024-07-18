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
  IGetClientPromise,
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
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from "../../../../../../components/pagination";

const initialFilters: IClientDataFilters = {
  ci: "",
  firstname: "",
  lastname: "",
};

const Clients = () => {
  const navigate = useNavigate();
  const bgFilters = useColorModeValue(lightBgForm, darkBgForm);
  const textColor = useColorModeValue(lightTextColor, darkTextColor);
  const [filters, setFilters] = useState<IClientDataFilters>(initialFilters);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IClientDataFilters>();
  const { mutate: getClients, isPending: areClientsFetching } = useAllClients();
  const [clientsData, setClientsData] = useState<IGetClientPromise>();
  const [clientSelected, setClientSelected] = useState<IClientDataTable>();

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const setClientsPage = (page: number) => {
    setPagination({ ...pagination, page });
  };

  useEffect(() => {
    getClients(
      {
        clientData: filters,
        skip: pagination.page,
        take: pagination.size,
      },
      {
        onSuccess: (cliensCollection) => {
          setClientsData(cliensCollection);
        },
      }
    );
  }, [filters, getClients, pagination.page, pagination.size]);

  useEffect(() => {
    if (clientSelected) navigate(`/dashboard/clients/${clientSelected.id}`);
  }, [navigate, clientSelected]);

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
    setPagination({ ...pagination, page: 1 });
    setFilters(values);
  };

  const resetAllFilters = () => {
    setFilters(initialFilters);
    reset();
  };

  return (
    <>
      <Box p={1} bg={bgFilters} mb={4} borderRadius={8}>
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
          <Flex
            justifyContent={{
              base: "flex-start",
              sm: "flex-start",
              md: "flex-end",
            }}
            alignItems="center"
            gap={2}
          >
            <Button
              variant="outline"
              w={{
                base: "100%",
                sm: "100%",
                md: "150px",
              }}
              h={8}
              colorScheme="brandScheme"
              borderRadius={8}
              fontWeight="normal"
              fontSize="sm"
              onClick={resetAllFilters}
            >
              Limpiar Filtros
            </Button>
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
        bg={bgFilters}
        borderRadius="2xl"
        p={1}
      >
        <DataTable
          columns={columns}
          isFetching={false}
          isLoading={areClientsFetching}
          data={clientsData?.clients}
          tableSize="md"
          setSelectedItem={setClientSelected}
          tableVariant="simple"
        />
        <Box
          p="2"
          bg="brand.50"
          backgroundColor={bgFilters}
          borderBottomRadius={"2xl"}
        >
          <Pagination
            setPage={setClientsPage}
            page={pagination.page}
            pageSize={pagination.size}
            totalItems={clientsData?.totalLength}
          >
            <PaginationButtonFirstPage />
            <PaginationButtonPrevPage />
            <PaginationInfo />
            <PaginationButtonNextPage />
            <PaginationButtonLastPage />
          </Pagination>
        </Box>
      </SimpleGrid>
    </>
  );
};
export default Clients;
