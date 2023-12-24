// import React from 'react';
// import { Button } from 'reactstrap';
// import './pagination.css';

// const Pagination = ({ showPerPage, postsPerPage, totalPosts, paginate, currentPage}) => {
//     const pageNumber = [];
//     const totalPages = Math.ceil(totalPosts/postsPerPage)
//     for (let i=1; i<=totalPages; i++) {
//         pageNumber.push(i);
//     }

//     return (
//         <div className="pagination-main" >
//             <div style={{alignItems: "center"}}>
//                 <span style={{display: 'inline-block'}}>Page: <b>{currentPage}/{Math.ceil(totalPosts / postsPerPage)}</b> - Found <b>{totalPosts}</b> roles </span>
//             </div>
//             <div style={{justifyContent: "center", display: "flex", marginTop : "10px"}}>
//                 <nav style={{padding: 0, margin: 0}}>
//                     <ul className="pagination" style={{padding: 0, margin: 0}}>
//                         {pageNumber.map(number => (
//                             <Button onClick={() => paginate(number)} className="pageLink" key={number}>
//                                 {number}
//                             </Button>
//                         ))}
//                         {showPerPage ??
//                         (<select name="pagination" className="selective-pagination" onChange={(e) => paginate(e.target.value)}>
//                             {
//                             pageNumber.map(number => (
//                                 <option className="pageLink selective-pagination" value={number} key={number}>
//                                     {number}
//                                 </option>
//                             ))}
//                         </select>)}
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     )
// }

// export default Pagination;


import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.css';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key={DOTS} className="pagination-item dots">&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li 
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;