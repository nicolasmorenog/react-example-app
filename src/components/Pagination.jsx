/**
 * Pagination component for navigating through paginated lists
 * @param {number} currentPage - Current active page
 * @param {Function} onPageChange - Callback when page changes
 * @param {number} totalItems - Total number of items
 * @param {number} itemsPerPage - Number of items per page
 */
function Pagination({ currentPage, onPageChange, totalItems, itemsPerPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  if (totalItems <= itemsPerPage) {
    return null;
  }

  const handlePrevious = () => {
    if (hasPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="pagination" aria-label="Pagination navigation">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={!hasPrevious}
        className={!hasPrevious ? 'inactive-button' : ''}
        aria-label="Go to previous page"
      >
        &lt; Previous
      </button>

      {hasPrevious && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          className="adjacent-page"
          aria-label={`Go to page ${currentPage - 1}`}
        >
          {currentPage - 1}
        </button>
      )}

      <button
        type="button"
        className="pagination-current-page"
        aria-current="page"
        aria-label={`Current page, page ${currentPage}`}
        disabled
      >
        {currentPage}
      </button>

      {hasNext && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="adjacent-page"
          aria-label={`Go to page ${currentPage + 1}`}
        >
          {currentPage + 1}
        </button>
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={!hasNext}
        className={!hasNext ? 'inactive-button' : ''}
        aria-label="Go to next page"
      >
        Next &gt;
      </button>
    </nav>
  );
}

export default Pagination;
