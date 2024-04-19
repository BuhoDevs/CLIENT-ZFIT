import { Box, SimpleGrid, Spinner, useColorModeValue } from "@chakra-ui/react";

import { ColumnDef } from "@tanstack/react-table";

import { useAllClients } from "../../../../../../hooks/client";
import { IClient } from "../../../../../../types/client";
import CustomHeaderColumn from "../../Table/CustomHeaderColumn";
import { DataTable } from "../../Table/DataTable";
import { stateDiccionary } from "../../Table/utils";
import { StateDiccionaryProps } from "../../../../../../types/table";
import {
  darkBgForm,
  lightBgForm,
} from "../../../../../../components/form/variables";

const Clients = () => {
  const bgTableContainer = useColorModeValue(lightBgForm, darkBgForm);
  const columns: ColumnDef<IClient>[] = [
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
  const { data: clients, isLoading, isError, isFetching } = useAllClients();

  if (isLoading)
    return (
      <Box textAlign="center">
        <Spinner size="lg" color="teal" />
      </Box>
    );
  if (isError) return <Box>oops algo fallo</Box>;

  return (
    <SimpleGrid
      mb="20px"
      columns={{ base: 1, md: 1 }}
      spacing={{ base: "20px", xl: "20px" }}
      bg={bgTableContainer}
    >
      <DataTable
        columns={columns}
        data={clients}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </SimpleGrid>
  );
};
export default Clients;
