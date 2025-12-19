import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5
}) => {
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const leftSiblingIndex = Math.max(currentPage - 1, 1);
            const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

            if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftRange = Array.from({ length: maxVisiblePages }, (_, i) => i + 1);
                pages.push(...leftRange, '...', totalPages);
            } else if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightRange = Array.from(
                    { length: maxVisiblePages },
                    (_, i) => totalPages - maxVisiblePages + i + 1
                );
                pages.push(1, '...', ...rightRange);
            } else {
                pages.push(
                    1,
                    '...',
                    leftSiblingIndex,
                    currentPage,
                    rightSiblingIndex,
                    '...',
                    totalPages
                );
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
          flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-200
          ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                    }
        `}
            >
                <ChevronLeft size={20} />
            </button>

            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span
                            key={`dots-${index}`}
                            className="flex items-center justify-center w-10 h-10 text-gray-500"
                        >
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`
              flex items-center justify-center w-10 h-10 rounded-lg
              font-medium transition-all duration-200
              ${currentPage === page
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                            }
            `}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
          flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-200
          ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                    }
        `}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;