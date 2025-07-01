import { useState } from 'react';
import { paginateData } from '../utils/pagination';

export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedResult = paginateData(data, currentPage, itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= paginatedResult.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    resetPage,
    ...paginatedResult,
  };
};
