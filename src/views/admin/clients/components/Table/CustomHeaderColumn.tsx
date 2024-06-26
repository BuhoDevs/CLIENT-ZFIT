import { Flex } from "@chakra-ui/react";
import { SorterArrowIcon } from "./SorterArrowIcon";
import { IClientDataTable } from "../../../../../types/client";
import { Column } from "@tanstack/react-table";
import { ISubscriptionDataTable } from "../../../../../types/suscription";
import {
  IExpenseBalanceDataTable,
  ISubscriptionBalanceDataTable,
} from "../../../../../types/balance";
import { IExpenseDataTable } from "../../../../../types/expense";

interface ICustomHeaderColumn {
  column:
    | Column<IClientDataTable, unknown>
    | Column<ISubscriptionBalanceDataTable, unknown>
    | Column<IExpenseBalanceDataTable, unknown>
    | Column<ISubscriptionDataTable, unknown>
    | Column<IExpenseDataTable, unknown>;
  columnText: string;
}

const CustomHeaderColumn = ({ column, columnText }: ICustomHeaderColumn) => {
  return (
    <Flex
      px="0"
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {columnText}
      <SorterArrowIcon sortState={column.getIsSorted()} />
    </Flex>
  );
};
export default CustomHeaderColumn;
