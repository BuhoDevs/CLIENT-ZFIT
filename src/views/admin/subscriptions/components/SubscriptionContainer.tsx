import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { darkBgForm, lightBgForm } from "../../../../components/form/variables";
import SubscriptionFormFilters from "./SubscriptionFormFilters";
import {
  IGetSubscriptionsPromise,
  ISubscriptionDataFilters,
  ISubscriptionDataTable,
} from "../../../../types/suscription";
import { useEffect, useState } from "react";
import { useGetSubscriptionsByFilters } from "../../../../hooks/subscriptions";
import CustomHeaderColumn from "../../clients/components/Table/CustomHeaderColumn";
import { ColumnDef } from "@tanstack/react-table";
import { stateDiccionary } from "../../clients/components/Table/utils";
import { StateDiccionaryProps } from "../../../../types/table";
import { DataTable } from "../../clients/components/Table/DataTable";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import moment from "moment";
import "moment/locale/es";
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from "../../../../components/pagination";
import { useNavigate } from "react-router-dom";

const initialFilters: ISubscriptionDataFilters = {
  ci: "",
  firstname: "",
  lastname: "",
  disciplineId: undefined,
  subsTypeId: undefined,
  subscriptorId: undefined,
  dateIn: "",
  dateOut: "",
  status: true,
};

moment.locale("es");
const SubscriptionContainer = () => {
  const navigate = useNavigate();
  const bgFilters = useColorModeValue(lightBgForm, darkBgForm);
  const [filters, setFilters] =
    useState<ISubscriptionDataFilters>(initialFilters);
  const { register, handleSubmit, reset } = useForm<ISubscriptionDataFilters>();

  const { mutate: getSubscriptions, isPending: areSubscriptionsFetching } =
    useGetSubscriptionsByFilters();
  const [subscriptionsData, setSubscriptionsData] =
    useState<IGetSubscriptionsPromise>();

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const [subscriptionSelected, setSubscriptionSelected] =
    useState<ISubscriptionDataTable>();

  const setSubscriptionsPage = (page: number) => {
    setPagination({ ...pagination, page });
  };

  useEffect(() => {
    getSubscriptions(
      {
        subscriptionData: filters,
        skip: pagination.page,
        take: pagination.size,
      },
      {
        onSuccess: (subscriptionsCollection) => {
          setSubscriptionsData(subscriptionsCollection);
        },
      }
    );
  }, [filters, getSubscriptions, pagination.page, pagination.size]);

  useEffect(() => {
    if (subscriptionSelected) {
      navigate(`/dashboard/subscriptions/edition/${subscriptionSelected.id}`);
    }
  }, [navigate, subscriptionSelected]);

  const subscriptionsColumns: ColumnDef<ISubscriptionDataTable>[] = [
    {
      header: "FOTO",
      accessorKey: "Client.Person.photo",
      cell: ({ row }) => (
        <Avatar
          size="sm"
          name={row.original.Client.Person.firstname}
          src={row.original.Client.Person.photo}
        />
      ),
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CEDULA" />
      ),
      accessorKey: "Client.Person.ci",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="NOMBRES" />
      ),
      accessorKey: "Client.Person.firstname",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="APELLIDOS" />
      ),
      accessorKey: "Client.Person.lastname",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="DISCIPLINA" />
      ),
      accessorKey: "Discipline.label",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="FECHA INICIO" />
      ),
      accessorFn: (row) =>
        moment.utc(row.dateIn).locale("es").format("DD/MM/YYYY"),
      accessorKey: "dateIn",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="FECHA FIN" />
      ),
      accessorFn: (row) =>
        moment.utc(row.dateOut).locale("es").format("DD/MM/YYYY"),
      accessorKey: "dateOut",
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

  const onSearchSubscriptions = (values: ISubscriptionDataFilters) => {
    setPagination({ ...pagination, page: 1 });
    setFilters(values);
  };

  const resetAllFilters = () => {
    setFilters(initialFilters);
    reset();
  };

  return (
    <>
      <Box p={1} bg={bgFilters} borderRadius={8}>
        {/* filtros */}
        <form onSubmit={handleSubmit(onSearchSubscriptions)}>
          <SubscriptionFormFilters register={register} />
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
              type="submit"
              borderRadius={8}
              leftIcon={<Icon as={FaSearch} />}
              colorScheme="brandScheme"
              color="white"
              fontWeight="normal"
              fontSize="sm"
              w={{
                base: "100%",
                sm: "100%",
                md: "150px",
              }}
              h={8}
            >
              Buscar
            </Button>
          </Flex>
        </form>
      </Box>
      <Box mt={5} p={1} bg={bgFilters} borderRadius={8}>
        <DataTable
          columns={subscriptionsColumns}
          isFetching={areSubscriptionsFetching}
          isLoading={false}
          tableVariant="simple"
          data={subscriptionsData?.subscriptions}
          setSelectedItem={setSubscriptionSelected}
        />
        <Box
          p="2"
          bg="brand.50"
          backgroundColor={bgFilters}
          borderBottomRadius={"2xl"}
        >
          <Pagination
            setPage={setSubscriptionsPage}
            page={pagination.page}
            pageSize={pagination.size}
            totalItems={subscriptionsData?.totalLength}
          >
            <PaginationButtonFirstPage />
            <PaginationButtonPrevPage />
            <PaginationInfo />
            <PaginationButtonNextPage />
            <PaginationButtonLastPage />
          </Pagination>
        </Box>
      </Box>
    </>
  );
};

export default SubscriptionContainer;
