/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React from 'react';
import './index.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          className="prev-button"
        >
          Anterior
        </button>
      )}
      
      {pageNumbers.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="next-button"
        >
          Próximo
        </button>
      )}
    </div>
  );
}

export default Pagination;