import type { IconButtonProps } from "@chakra-ui/react";
import { HStack, IconButton } from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import type { FC } from "react";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { Icon } from "../icons/Icon";
import { getPaginationInfo } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PaginationContext = React.createContext<any>(null);

export const PaginationButtonFirstPage: FC<
  Omit<IconButtonProps, "aria-label">
> = ({ ...rest }) => {
  const { setPage, firstPage, isFirstPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(firstPage)}
      aria-label="first-page"
      icon={<Icon icon={FiChevronsLeft} fontSize="lg" />}
      size="sm"
      isDisabled={isFirstPage}
      {...rest}
    />
  );
};

export const PaginationButtonPrevPage: FC<
  Omit<IconButtonProps, "aria-label">
> = ({ ...rest }) => {
  const { setPage, page, isFirstPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(page - 1)}
      aria-label="prev-page"
      icon={<Icon icon={FiChevronLeft} fontSize="lg" />}
      size="sm"
      isDisabled={isFirstPage}
      {...rest}
    />
  );
};

export const PaginationButtonLastPage: FC<
  Omit<IconButtonProps, "aria-label">
> = ({ ...rest }) => {
  const { setPage, lastPage, isLastPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(lastPage)}
      aria-label="last-page"
      icon={<Icon icon={FiChevronsRight} fontSize="lg" />}
      size="sm"
      isDisabled={isLastPage}
      {...rest}
    />
  );
};

export const PaginationButtonNextPage: FC<
  Omit<IconButtonProps, "aria-label">
> = ({ ...rest }) => {
  const { setPage, page, isLastPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(page + 1)}
      aria-label="next-page"
      icon={<Icon icon={FiChevronRight} fontSize="lg" />}
      size="sm"
      isDisabled={isLastPage}
      {...rest}
    />
  );
};

interface PaginationProps {
  setPage: (page: number) => void;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  children?: React.ReactNode[];
}

export const PaginationInfo = ({ ...rest }) => {
  const { firstItemOnPage, lastItemOnPage, totalItems } =
    useContext(PaginationContext);

  return (
    <HStack
      spacing="1"
      align="center"
      textAlign="center"
      justify="center"
      {...rest}
    >
      <strong>{firstItemOnPage}</strong>
      <span>a</span>
      <strong>{lastItemOnPage}</strong>
      <span>de</span> <strong>{totalItems}</strong>
      <span>resultados</span>
    </HStack>
  );
};

export const Pagination = ({
  setPage,
  page = 1,
  pageSize = 10,
  totalItems = 0,
  ...rest
}: PaginationProps) => {
  const pagination = getPaginationInfo({ page, pageSize, totalItems });

  const value = useMemo(
    () => ({
      setPage,
      page,
      pageSize,
      totalItems,
      ...pagination,
    }),
    [page, pageSize, totalItems, pagination, setPage]
  );

  return (
    <PaginationContext.Provider value={value}>
      <HStack w="full" justifyContent="flex-end" {...rest} />
    </PaginationContext.Provider>
  );
};
