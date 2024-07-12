import {
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileExport, FaSearch } from "react-icons/fa";
import {
  darkBgForm,
  darkBrandBgColor,
  lightBgForm,
  lightBrandBgColor,
} from "../../../../components/form/variables";
import { useIncomeExpense } from "../../../../hooks/subscriptions";
import {
  IBalanceExport,
  IBalanceFilter,
  IExpenseBalance,
  ISubscriptionBalance,
} from "../../../../types/balance";
import CustomHeaderColumn from "../../clients/components/Table/CustomHeaderColumn";
import { DataTable } from "../../clients/components/Table/DataTable";
import BalanceFormFilters from "./BalanceFormFilter";
import { BiMoneyWithdraw } from "react-icons/bi";
import TotalBalanceStatitics from "../../../../components/card/MiniStatistics";
import IconBox from "../../../../components/icons/IconBox";
import { MdBarChart } from "react-icons/md";
import { handleBalanceExport } from "../../../../services/balances/balances.service";

moment.locale("es");

// Calcular fechas por defecto
const defaultStartDate = moment()
  .subtract(1, "month")
  .date(12)
  .format("YYYY-MM-DD");
const defaultEndDate = moment().format("YYYY-MM-DD");

const initialFilters: IBalanceFilter = {
  startDate: defaultStartDate,
  endDate: defaultEndDate,
};

const BalanceContainer = () => {
  const toast = useToast();
  const bgFilters = useColorModeValue(lightBgForm, darkBgForm);
  const brandColors = useColorModeValue(lightBrandBgColor, darkBrandBgColor);
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [filters, setFilters] = useState<IBalanceFilter>(initialFilters);
  const { register, handleSubmit, reset, control } = useForm<IBalanceFilter>();

  const {
    data: incomeExpenseData,
    isLoading: isIncomeExpenseFetching,
    refetch,
  } = useIncomeExpense({
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  //   const [pagination, setPagination] = useState({
  //     page: 1,
  //     size: 10,
  //   });

  //   const setSubscriptionsPage = (page: number) => {
  //     setPagination({ ...pagination, page });
  //   };

  //   useEffect(() => {
  //     getSubscriptions(
  //       {
  //         subscriptionData: filters,
  //         skip: pagination.page,
  //         take: pagination.size,
  //       },
  //       {
  //         onSuccess: (subscriptionsCollection) => {
  //           setSubscriptionsData(subscriptionsCollection);
  //         },
  //       }
  //     );
  //   }, [filters, getSubscriptions, pagination.page, pagination.size]);

  const incomeColumns: ColumnDef<ISubscriptionBalance>[] = [
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="DISCIPLINA" />
      ),
      accessorKey: "discipline",
      //   cell: ({ row }) => (
      //     <Avatar
      //       size="sm"
      //       name={row.original.Client.Person.firstname}
      //       src={row.original.Client.Person.photo}
      //     />
      //   ),
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="TIPO SUSCRIPCION" />
      ),
      accessorKey: "subsType",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CANT. SUSCRIPCIONES" />
      ),
      accessorKey: "count",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="TOTAL RECAUDADO" />
      ),
      accessorKey: "totalAmount",
    },
  ];

  const expenseColumns: ColumnDef<IExpenseBalance>[] = [
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="TIPO GASTO" />
      ),
      accessorKey: "category",
      //   cell: ({ row }) => (
      //     <Avatar
      //       size="sm"
      //       name={row.original.Client.Person.firstname}
      //       src={row.original.Client.Person.photo}
      //     />
      //   ),
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="CANT. POR TIPO" />
      ),
      accessorKey: "count",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="TOTAL GASTADO" />
      ),
      accessorKey: "totalAmount",
    },
  ];

  const onSearchSubscriptions = (values: IBalanceFilter) => {
    // setPagination({ ...pagination, page: 1 });
    console.log(values, "VALORES");
    setFilters(values);
  };

  const resetAllFilters = () => {
    setFilters(initialFilters);
    reset();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    toast({
      title: "Error de descarga",
      // description: `${error.response.data.businessMessage}`,
      description: `Ocurrió un error en la descarga: ${error}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleExport = async ({
    startDate,
    endDate,
    filename,
  }: IBalanceExport) => {
    try {
      await handleBalanceExport({
        startDate,
        endDate,
        filename,
      });
    } catch (error) {
      console.log("El error es ", error);
      onError(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <>
      <Box p={1} bg={bgFilters} borderRadius={8}>
        {/* filtros */}
        <form onSubmit={handleSubmit(onSearchSubscriptions)}>
          <BalanceFormFilters
            register={register}
            control={control}
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
      <Flex mt={5} justifyContent="space-between" alignItems="center">
        <Button
          borderRadius={3}
          leftIcon={<Icon as={BiMoneyWithdraw} color={brandColors} />}
          _hover="none"
          w={{
            base: "100%",
            sm: "100%",
            md: "120px",
          }}
          h={8}
        >
          Ingresos
        </Button>
        <Button
          borderRadius={3}
          leftIcon={<Icon as={FaFileExport} bg={brandColors} />}
          colorScheme="brandScheme"
          color="white"
          fontWeight="normal"
          fontSize="xs"
          onClick={() => {
            if (filters)
              handleExport({
                startDate: filters.startDate || "",
                endDate: filters.endDate || "",
                filename: `${Date.now()}-balance.xlsx`,
              });
          }}
          w={{
            base: "100%",
            sm: "100%",
            md: "120px",
          }}
          h={8}
        >
          Exportar balance
        </Button>
      </Flex>
      <Box mt={1} p={1} bg={bgFilters} borderRadius={8}>
        <DataTable
          columns={incomeColumns}
          isFetching={isIncomeExpenseFetching}
          isLoading={false}
          tableVariant="simple"
          data={incomeExpenseData?.subscriptionBalance}
        />
      </Box>
      <Flex mt={5} justifyContent="space-between" alignItems="center">
        {/* <Button
          borderRadius={3}
          leftIcon={<Icon as={BiMoneyWithdraw} color={brandColors} />}
          _hover="none"
          w={{
            base: "100%",
            sm: "100%",
            md: "120px",
          }}
          h={8}
        >
          Egresos
        </Button> */}
        {/* <Button
          borderRadius={3}
          leftIcon={<Icon as={FaFileExport} bg={brandColors} />}
          colorScheme="brandScheme"
          color="white"
          fontWeight="normal"
          fontSize="xs"
          w={{
            base: "100%",
            sm: "100%",
            md: "100px",
          }}
          h={8}
        >
          Exportar
        </Button> */}
      </Flex>
      <Box mt={1} p={1} bg={bgFilters} borderRadius={8}>
        <DataTable
          columns={expenseColumns}
          isFetching={isIncomeExpenseFetching}
          isLoading={false}
          tableVariant="simple"
          data={incomeExpenseData?.expenseBalance}
        />
      </Box>
      {/* TOTALES */}
      <Flex mt={5} justifyContent="space-between" alignItems="center">
        <Button
          borderRadius={3}
          leftIcon={<Icon as={BiMoneyWithdraw} color={brandColors} />}
          _hover="none"
          w={{
            base: "100%",
            sm: "100%",
            md: "150px",
          }}
          h={8}
        >
          Blance Total
        </Button>
        {/* <Button
          borderRadius={3}
          leftIcon={<Icon as={FaFileExport} bg={brandColors} />}
          colorScheme="brandScheme"
          color="white"
          fontWeight="normal"
          fontSize="xs"
          w={{
            base: "100%",
            sm: "100%",
            md: "100px",
          }}
          h={8}
        >
          Exportar
        </Button> */}
      </Flex>
      <Box mt={1}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" mb="20px">
          <TotalBalanceStatitics
            borderRadius={8}
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdBarChart} color={brandColors} />
                }
              />
            }
            name="INGRESOS"
            value={incomeExpenseData?.totalIncome || ""}
          />

          <TotalBalanceStatitics
            borderRadius={8}
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdBarChart} color={brandColors} />
                }
              />
            }
            name="GASTOS"
            value={incomeExpenseData?.totalExpense || ""}
          />

          <TotalBalanceStatitics
            borderRadius={8}
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdBarChart} color={brandColors} />
                }
              />
            }
            name="INGRESOS NETOS"
            value={incomeExpenseData?.netBalance || ""}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default BalanceContainer;
