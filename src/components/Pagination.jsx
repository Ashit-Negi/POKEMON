import React from "react";

function Pagination({ page, setPage }) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Prev
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
