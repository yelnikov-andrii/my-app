import { useState } from 'react';
import './Pagination.scss';

export const Pagination = ({ total, onSelect }) => {
  const pages = [];
  const [selectedPage, setSelectedPage] = useState(1);
  const amountOfPages = Math.ceil(total / 8);

  for (let i = 1; i <= amountOfPages; i += 1) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li>
          <ul className="pagination">
            {pages.map((page) => (
              <li 
                className="pagination__page"
                key={page}
              >
                <button
                  type="button"
                  className={
                    selectedPage === page ? 'pagination__page-link pagination__page-link--active' : 'pagination__page-link'
                  }
                  onClick={() => {
                    setSelectedPage(page);
                    onSelect(page)
                  }}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </li>
        <li className="page-item">
          <button
            className="pagination__page-link"
            type="button"
            onClick={() => {
              setSelectedPage(prev => prev + 1);
              onSelect(selectedPage + 1);
            }}
            disabled={selectedPage === amountOfPages}
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};