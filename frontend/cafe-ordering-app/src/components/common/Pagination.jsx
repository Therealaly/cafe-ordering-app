import { ChevronLeft, ChevronRight } from "lucide-react";
import { generatePageNumbers, isValidPageNumber } from "../../utils/pagination";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "" 
}) => {
  const handlePageClick = (pageNumber) => {
    if (isValidPageNumber(pageNumber, totalPages)) {
      onPageChange(pageNumber);
    }
  };

  const pageNumbers = generatePageNumbers(totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`mt-4 flex justify-center items-center space-x-2 text-black ${className}`}>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => handlePageClick(number)}
          className={`px-3 py-1 rounded-md border ${
            currentPage === number 
              ? 'bg-green-600 text-white border-green-600' 
              : 'bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
