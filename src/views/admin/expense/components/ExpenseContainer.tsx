import { Box, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { darkBgForm, lightBgForm } from "../../../../components/form/variables";
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from "../../../../components/pagination";
import { useGetExpenseByFilters } from "../../../../hooks/expense";
import { useAllExpenseCategories } from "../../../../hooks/expenseCategories";
import {
  IExpenseDataTable,
  IExpenseFormFilter,
  IGetExpensesPromise,
} from "../../../../types/expense";
import CustomHeaderColumn from "../../clients/components/Table/CustomHeaderColumn";
import { DataTable } from "../../clients/components/Table/DataTable";
import ExpenseFormFilters from "./ExpenseFormFilters";

moment.locale("es");

// Calcular fechas por defecto
const defaultStartDate = moment()
  .subtract(1, "month")
  .date(12)
  .format("YYYY-MM-DD");
const defaultEndDate = moment().format("YYYY-MM-DD");

const initialFilters: IExpenseFormFilter = {
  Category: {
    value: 0,
    label: "",
    id: 0,
    name: "",
    status: false,
  },
  description: "",
  startDate: defaultStartDate,
  endDate: defaultEndDate,
};

moment.locale("es");
const ExpenseContainer = () => {
  const navigate = useNavigate();
  const bgFilters = useColorModeValue(lightBgForm, darkBgForm);
  const [filters, setFilters] = useState<IExpenseFormFilter>(initialFilters);
  const { register, handleSubmit, reset, control } =
    useForm<IExpenseFormFilter>();

  const { data: expenseCategoriesData } = useAllExpenseCategories();

  const { mutate: getExpenses, isPending: areExpensesFetching } =
    useGetExpenseByFilters();
  const [expensesData, setExpensesData] = useState<IGetExpensesPromise>();

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const [subscriptionSelected, setSubscriptionSelected] =
    useState<IExpenseDataTable>();

  const setExpensesPage = (page: number) => {
    setPagination({ ...pagination, page });
  };

  useEffect(() => {
    getExpenses(
      {
        expenseData: filters,
        skip: pagination.page,
        take: pagination.size,
      },
      {
        onSuccess: (expensesCollection) => {
          setExpensesData(expensesCollection);
        },
      }
    );
  }, [filters, getExpenses, pagination.page, pagination.size]);

  useEffect(() => {
    if (subscriptionSelected) {
      navigate(`/dashboard/subscriptions/edition/${subscriptionSelected.id}`);
    }
  }, [navigate, subscriptionSelected]);

  const expensesColumns: ColumnDef<IExpenseDataTable>[] = [
    // {
    //   header: "FOTO",
    //   accessorKey: "Client.Person.photo",
    //   cell: ({ row }) => (
    //     <Avatar
    //       size="sm"
    //       name={row.original.Client.Person.firstname}
    //       src={row.original.Client.Person.photo}
    //     />
    //   ),
    // },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CANTIDAD BS" />
      ),
      accessorKey: "amount",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="DESCRIPCIÓN" />
      ),
      accessorKey: "description",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="TIPO GASTO" />
      ),
      accessorKey: "category.label",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="FECHA" />
      ),
      accessorFn: (row) =>
        moment.utc(row.createdAt).locale("es").format("DD/MM/YYYY"),
      accessorKey: "createdAt",
    },
    // {
    //   header: ({ column }) => (
    //     <CustomHeaderColumn column={column} columnText="FECHA FIN" />
    //   ),
    //   accessorFn: (row) =>
    //     moment.utc(row.dateOut).locale("es").format("DD/MM/YYYY"),
    //   accessorKey: "dateOut",
    // },
    // {
    //   header: ({ column }) => (
    //     <CustomHeaderColumn column={column} columnText="ESTADO" />
    //   ),
    //   accessorFn: (row) =>
    //     stateDiccionary[String(row.status) as keyof StateDiccionaryProps],
    //   accessorKey: "status",
    // },
  ];

  const onSearchSubscriptions = (values: IExpenseFormFilter) => {
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
          <ExpenseFormFilters
            register={register}
            control={control}
            expenseCategoriesData={expenseCategoriesData}
            defaultStartDate={defaultStartDate}
            defaultEndDate={defaultEndDate}
          />
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
          columns={expensesColumns}
          isFetching={areExpensesFetching}
          isLoading={false}
          tableVariant="simple"
          data={expensesData?.expenses}
          setSelectedItem={setSubscriptionSelected}
        />
        <Box
          p="2"
          bg="brand.50"
          backgroundColor={bgFilters}
          borderBottomRadius={"2xl"}
        >
          <Pagination
            setPage={setExpensesPage}
            page={pagination.page}
            pageSize={pagination.size}
            totalItems={expensesData?.totalLength}
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

export default ExpenseContainer;
