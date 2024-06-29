import {
  Box,
  Button,
  Flex,
  Icon,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import "moment/locale/es";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
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
  IEditionExpenseForm,
  IExpenseDataTable,
  IExpenseFormFilter,
} from "../../../../types/expense";
import CustomHeaderColumn from "../../clients/components/Table/CustomHeaderColumn";
import { DataTable } from "../../clients/components/Table/DataTable";
import {
  expenseFiltersParser,
  numericComparator,
  parseToEditionExpenseData,
} from "../utils";
import EditionExpenseModal from "./EditionExpenseModal";
import ExpenseFormFilters from "./ExpenseFormFilters";

moment.locale("es");

// Calcular fechas por defecto
const defaultStartDate = moment()
  .subtract(1, "month")
  .date(12)
  .format("YYYY-MM-DD");
const defaultEndDate = moment().format("YYYY-MM-DD");

const initialFilters: IExpenseFormFilter = {
  Category: undefined,
  description: undefined,
  startDate: defaultStartDate,
  endDate: defaultEndDate,
};

moment.locale("es");
const ExpenseContainer = () => {
  const bgFilters = useColorModeValue(lightBgForm, darkBgForm);
  const [filters, setFilters] = useState<IExpenseFormFilter>(initialFilters);
  const { register, handleSubmit, reset, control } =
    useForm<IExpenseFormFilter>({
      defaultValues: initialFilters,
    });

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });
  const { data: expenseCategoriesData } = useAllExpenseCategories();

  const { data: expensesData, isPending: areExpensesFetching } =
    useGetExpenseByFilters({
      expenseData: expenseFiltersParser(filters),
      skip: pagination.page,
      take: pagination.size,
      isReadyToFetch: Boolean(pagination.page && pagination.size),
    });

  const {
    isOpen: isEditionOpen,
    onOpen: onEditionOpen,
    onClose: onEditionClose,
  } = useDisclosure();
  const initialEditionRef = useRef<HTMLInputElement>(null);

  const [expenseSelected, setExpenseSelected] = useState<IEditionExpenseForm>();

  const setExpensesPage = (page: number) => {
    setPagination({ ...pagination, page });
  };

  // useEffect(() => {
  //   if (subscriptionSelected) {
  //     navigate(`/dashboard/subscriptions/edition/${subscriptionSelected.id}`);
  //   }
  // }, [navigate, subscriptionSelected]);

  const expensesColumns: ColumnDef<IExpenseDataTable>[] = [
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CANTIDAD BS" />
      ),
      sortingFn: numericComparator,
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
  ];

  const onSearchExpenses = (values: IExpenseFormFilter) => {
    setPagination({ ...pagination, page: 1 });
    setFilters(values);
  };

  const resetAllFilters = () => {
    setFilters(initialFilters);
    reset();
  };

  const handleExpenseSelected = (expenseSelected: IExpenseDataTable) => {
    setExpenseSelected(parseToEditionExpenseData(expenseSelected));
    onEditionOpen();
  };

  return (
    <>
      <Box p={1} bg={bgFilters} borderRadius={8}>
        {/* filtros */}
        <form onSubmit={handleSubmit(onSearchExpenses)}>
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
          // setSelectedItem={setSubscriptionSelected}
          setSelectedItem={handleExpenseSelected}
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
      {expenseSelected && (
        <EditionExpenseModal
          expenseDataForm={expenseSelected}
          initialRef={initialEditionRef}
          isOpen={isEditionOpen}
          onClose={onEditionClose}
        />
      )}
    </>
  );
};

export default ExpenseContainer;
