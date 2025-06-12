import { useState } from "react";
import "../styles/pagination.css";


export default function Pagination({ data, itemsPerPage, render }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderPageNumbers = () => {
    return (
      <>
        {/* Página 1 */}
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(1)}>
            1
          </button>
        </li>

        {/* Página 2 si existe */}
        {totalPages >= 2 && (
          <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(2)}>
              2
            </button>
          </li>
        )}

        {/* Puntos suspensivos si hay más de 3 páginas */}
        {totalPages > 3 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {/* Última página si es mayor a 2 */}
        {totalPages > 2 && (
          <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </button>
          </li>
        )}
      </>
    );
  };

  return (
    <>
      {render(currentItems)}

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
              Anterior
            </button>
          </li>

          {renderPageNumbers()}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
