import React, { useCallback, useEffect, useState } from "react";

type UsePaginationProps<T> = {
  data?: T[];
  initialRowsPerPage?: number;
};

export function usePagination<T>({
  data = [],
  initialRowsPerPage = 15,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);

  const getPaginatedData = useCallback((): T[] => {
    const startIndex = rowsPerPage * currentPage;
    const endIndex = startIndex + rowsPerPage;

    return data?.slice(startIndex, endIndex);
  }, [data, currentPage, rowsPerPage]);

  useEffect(() => {
    if (data?.length) {
      setPaginatedData(getPaginatedData());
    }
  }, [data, getPaginatedData, currentPage, rowsPerPage]);

  const handlePageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setCurrentPage(newPage);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value));
      setCurrentPage(0);
    },
    []
  );

  return {
    currentPage,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    paginatedData,
  };
}
