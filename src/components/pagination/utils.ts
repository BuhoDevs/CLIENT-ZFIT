export const getPaginationInfo = ({
  page = 1,
  pageSize = 10,
  totalItems = 0,
}) => {
  const firstItemOnPage = (page - 1) * pageSize + 1;
  const lastItemOnPage = Math.min(
    (page - 1) * pageSize + pageSize,
    totalItems ?? 0
  );
  const isFirstPage = firstItemOnPage <= 1;
  const isLastPage = lastItemOnPage >= totalItems;
  const firstPage = 1;
  const lastPage = Math.ceil(totalItems / pageSize);

  return {
    firstPage,
    lastPage,
    firstItemOnPage,
    lastItemOnPage,
    isFirstPage,
    isLastPage,
  };
};
