interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginationProps) {
    const maxVisiblePages = 5;
  
    const getDisplayedPages = () => {
      let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
      let endPage = startPage + maxVisiblePages - 1;
  
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
  
      const displayedPages = [];
      for (let i = startPage; i <= endPage; i++) {
        displayedPages.push(i);
      }
      return displayedPages;
    };
  
    return (
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-blue-900"
        >
            ◀
        </button>
        <div className="flex mx-4">
          {getDisplayedPages().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`py-2 mx-1 rounded ${
                page === currentPage
                  ? 'text-blue-900 font-bold'
                  : 'text-blue-900 opacity-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-blue-900"
        >
          ▶
        </button>
      </div>
    );
  }
  