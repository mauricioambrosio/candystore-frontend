import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// component for managing page display 
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {/* go to previous page */}
        {pages.length>1
        ? <li className="page-item">
            <a className="page-link" 
              onClick={() => onPageChange(currentPage===1 ? currentPage : currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li> 
        : null}
        {/* go to selected page */}
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        {/* go to next page */}
        {pages.length>1
        ? <li className="page-item">
            <a className="page-link" 
              onClick = {() => onPageChange(currentPage===pagesCount ? currentPage : currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        : null}

      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
