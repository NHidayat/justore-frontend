import PropTypes from 'prop-types';

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than or equal to max visible, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show Prev, first pages, current page, some hidden, last page, and Next
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage > 4 && currentPage < totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-200'} `}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Prev
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} ${page === '...' ? 'cursor-default' : ''}`}
          onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ))}

      <button
        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-200'} `}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

CustomPagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func
};

export default CustomPagination;
