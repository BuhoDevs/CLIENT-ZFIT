import { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Box,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { rankItem } from "@tanstack/match-sorter-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  //   formVersionsData: IClientDataTable[] | undefined;
  isFetching: boolean;
  isLoading: boolean;
  tableSize?: string;
  tableVariant?: string;
  setSelectedItem?: (value: TData) => void;
  maxH?: string;
}

const defaultSorting = [{ id: "ci", desc: true }];

export function DataTable<TData, TValue>({
  columns,
  isFetching,
  isLoading,
  data,
  tableSize = "sm",
  tableVariant = "simple",
  setSelectedItem,
  maxH = "auto",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const bgThead = useColorModeValue("gray.100", "navy.700");

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    state: {
      sorting,
    },
    manualSorting: false,
    manualPagination: true,
  });

  useEffect(() => {
    if (sorting.length > 0) {
      /* empty */
    }
  }, [sorting]);

  const { rows } = table.getRowModel();

  return (
    <TableContainer
      ref={tableContainerRef}
      maxH={maxH}
      className="customScroll"
      overflowY="auto"
    >
      <Table variant={tableVariant} size={tableSize} colorScheme="brandScheme">
        <Thead position="sticky" top={0} bg={bgThead} zIndex={1}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                //   const widthByColumn =
                //     header.column.id === "actions" ? "w-[64px]" : undefined;
                return (
                  <Th
                    key={header.id}
                    //className={cn(widthByColumn)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {isFetching || isLoading ? (
            <Tr>
              <Td
                colSpan={columns.length}
                position="relative"
                height="24px"
                textAlign="center"
              >
                <Box position="relative" minH="500px">
                  <Spinner size="lg" />
                </Box>
              </Td>
            </Tr>
          ) : rows.length > 0 ? (
            rows.map((row) => {
              return (
                <Tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    if (setSelectedItem) {
                      setSelectedItem(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={columns.length} height="24px" textAlign="center">
                Sin resultados.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
