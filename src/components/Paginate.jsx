import React, { useEffect, useMemo, useState } from "react";
function Paginate({ page, totalPage, onPageChange }) {
    const handlePageChange = (e, value) => {
        onPageChange(e, value);
    };
    const numberOfPages = useMemo(
        () => new Array(totalPage).fill(0).map((_, idx) => idx + 1),
        [totalPage]
    );
    const [arrOfCurrentPage, setArrOfCurrentPage] = useState([]);

    useEffect(() => {
        let tempNumberOfPages = [...numberOfPages];
        if (numberOfPages.length > 5) {
            if (page >= 1 && page <= 3) {
                tempNumberOfPages = [1, 2, 3, 4, "...", numberOfPages.length];
            } else if (page === 4) {
                const sliced = numberOfPages.slice(0, 5);
                tempNumberOfPages = [...sliced, "...", numberOfPages.length];
            } else if (page > 4 && page < numberOfPages.length - 2) {
                const sliced1 = numberOfPages.slice(page - 2, page);
                const sliced2 = numberOfPages.slice(page, page + 1);
                tempNumberOfPages = [
                    1,
                    "...",
                    ...sliced1,
                    ...sliced2,
                    "...",
                    numberOfPages.length,
                ];
            } else if (page > numberOfPages.length - 3) {
                const sliced = numberOfPages.slice(numberOfPages.length - 4);
                tempNumberOfPages = [1, "...", ...sliced];
            }
        }

        setArrOfCurrentPage(tempNumberOfPages);
    }, [page, numberOfPages]);
    return (
        <div
            className={
                totalPage === 1 || !totalPage
                    ? "c-paginate is-hide"
                    : "c-paginate"
            }
        >
            <ul>
                {(totalPage > 1 && (
                    <li
                        className={`c-paginate__item c-paginate__item--controller${
                            page === 1 ? " is-disable" : ""
                        }`}
                        onClick={(e) => handlePageChange(e, page - 1)}
                    >
                        prev
                    </li>
                )) || <></>}

                {arrOfCurrentPage.map((item, index) => (
                    <li
                        className={`c-paginate__item${
                            !Number(item)
                                ? " c-paginate__item--dots"
                                : " c-paginate__item--num"
                        }${page === item ? " is-current" : ""}`}
                        key={index}
                        onClick={(e) => handlePageChange(e, item)}
                    >
                        {item}
                    </li>
                ))}
                {(totalPage > 1 && (
                    <li
                        className={`c-paginate__item c-paginate__item--controller${
                            page === totalPage ? " is-disable" : ""
                        }`}
                        onClick={(e) =>
                            page < totalPage
                                ? handlePageChange(e, page + 1)
                                : ""
                        }
                    >
                        next
                    </li>
                )) || <></>}
            </ul>
        </div>
    );
}

export default Paginate;
