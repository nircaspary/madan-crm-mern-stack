import { React, useState } from 'react';
import '../admins.css';

const TableFooter = ({ headerLenght, contentLenght }) => {
  const [activePage, setActivePage] = useState(1);

  const pages = [];
  for (let i = 1; i < contentLenght / 5 + 1; i++) pages.push(i);

  const handlePageNumberClick = (page) => setActivePage(page);
  const handleNextPageClick = (page) => page !== pages.length && setActivePage(page + 1);
  const handlePreviousPageClick = (page) => page !== 1 && setActivePage(page - 1);

  return (
    <div colSpan={headerLenght}>
      <div className="ui pagination menu">
        <a className="icon item" onClick={() => handlePreviousPageClick(activePage)}>
          <i className="left chevron icon"></i>
        </a>
        {pages.map((page) => {
          const active = page == activePage ? 'active' : '';
          return (
            <a onClick={() => handlePageNumberClick(page)} className={`item ${active}`} key={page}>
              {page}
            </a>
          );
        })}
        <a className="icon item" onClick={() => handleNextPageClick(activePage)}>
          <i className="right chevron icon"></i>
        </a>
      </div>
    </div>
  );
};
export default TableFooter;
