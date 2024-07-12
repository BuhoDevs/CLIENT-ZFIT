import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import "moment/locale/es";
import { useState } from "react";
import { darkBgForm, lightBgForm } from "../../../../components/form/variables";
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from "../../../../components/pagination";
import { useGetCurrentAttendances } from "../../../../hooks/checkin";
import { ICurrentAttendanceDatatable } from "../../../../types/checkin";
import CustomHeaderColumn from "../../clients/components/Table/CustomHeaderColumn";
import { DataTable } from "../../clients/components/Table/DataTable";

moment.locale("es");
const AttendancesContainer = () => {
  // const navigate = useNavigate();
  const bgFilters = useColorModeValue(lightBgForm, darkBgForm);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const { data: currentAttendancesData, isPending: areAttendancesFetching } =
    useGetCurrentAttendances({
      skip: pagination.page,
      take: pagination.size,
    });

  const setSubscriptionsPage = (page: number) => {
    setPagination({ ...pagination, page });
  };

  const attendancesColumns: ColumnDef<ICurrentAttendanceDatatable>[] = [
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
    // {
    //   header: ({ column }) => (
    //     <CustomHeaderColumn column={column} columnText="NOMBRES" />
    //   ),
    //   accessorKey: "firstname",
    // },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="NOMBRES y APELLIDOS" />
      ),
      accessorKey: "display_name",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="DISCIPLINA" />
      ),
      accessorKey: "Discipline.label",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="FECHA INGRESO" />
      ),
      accessorFn: (row) =>
        moment(row.createdAt).locale("es").format("DD/MM/YYYY"),
      accessorKey: "createdAt",
    },
    {
      header: ({ column }) => (
        <CustomHeaderColumn column={column} columnText="HORA" />
      ),
      accessorFn: (row) => moment(row.createdAt).locale("es").format("HH:mm"),
      accessorKey: "undefined",
    },
  ];

  return (
    <Box p={1} h="full" bg={bgFilters} borderRadius={8}>
      <Flex
        mt={2}
        px="25px"
        mb="16px"
        justifyContent="space-between"
        align="center"
      >
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Asistentes
        </Text>
      </Flex>
      <DataTable
        columns={attendancesColumns}
        isFetching={areAttendancesFetching}
        isLoading={false}
        tableVariant="simple"
        data={currentAttendancesData?.attendances}
        // setSelectedItem={setSubscriptionSelected}
      />
      {currentAttendancesData && currentAttendancesData.totalLength > 0 && (
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
            totalItems={currentAttendancesData?.totalLength}
          >
            <PaginationButtonFirstPage />
            <PaginationButtonPrevPage />
            <PaginationInfo />
            <PaginationButtonNextPage />
            <PaginationButtonLastPage />
          </Pagination>
        </Box>
      )}
    </Box>
  );
};

export default AttendancesContainer;
