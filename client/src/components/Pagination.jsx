export function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePrev = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
  
    return (
      <div className="flex items-center gap-5">
        <button onClick={handlePrev} disabled={currentPage === 1} className="bg-slate-900 px-4 py-2 rounded-xl">
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="bg-slate-900 px-4 py-2 rounded-xl">
          Next
        </button>
      </div>
    );
  }
  