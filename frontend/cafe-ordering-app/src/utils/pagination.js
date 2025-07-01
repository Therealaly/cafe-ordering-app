// Pagination utility functions
export const ITEMS_PER_PAGE = 10;

export const paginateData = (data, currentPage, itemsPerPage = ITEMS_PER_PAGE) => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalItems,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

export const generatePageNumbers = (totalPages) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export const isValidPageNumber = (pageNumber, totalPages) => {
  return pageNumber >= 1 && pageNumber <= totalPages;
};
