/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './index.css'

function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Defina quantos itens você deseja exibir por página
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`); // Dados de exemplo

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

  return (
    <div className='page'>
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Próximo'}
        breakLabel={'...'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default PaginationExample;