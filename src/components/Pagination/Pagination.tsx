// Define the type/interface for the pagination data

import type { PaginationInfo } from "../../types/feedback.types";


interface PaginationProps {
  data: PaginationInfo ;
  onPageChange: (newPage: number) => void;
  isFetching: boolean;
}

export const Pagination = ({ data, onPageChange, isFetching }: PaginationProps) => {
  const { current_page, total_pages, total_items, has_next, has_previous } =
    data;

  // Function to create a common button style
  const getButtonClasses = (isDisabled: boolean) =>
    `px-3 py-1 border rounded-lg transition-colors duration-150 mx-2 w-24 ${
      isDisabled || isFetching
        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
        : "bg-white text-indigo-600 border-indigo-400 hover:bg-indigo-50"
    }`;

  // Function to determine if a button is disabled
  const isPreviousDisabled = !has_previous || isFetching;
  const isNextDisabled = !has_next || isFetching;

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white border-t border-gray-200 mb-5 mt-auto rounded my-2">
      <button
        onClick={() => onPageChange(current_page - 1)}
        disabled={isPreviousDisabled}
        className={getButtonClasses(isPreviousDisabled)}
      >
        Previous
      </button>

      <div className="flex w-auto  flex-col items-center justify-items-center  text-sm text-gray-700">
        <span className="font-semibold">
          Page {current_page} of {total_pages}
        </span>

        <span className="text-gray-500 text-xs">(Total {total_items} items)</span>
      </div>

      <button
        onClick={() => onPageChange(current_page + 1)}
        disabled={isNextDisabled}
        className={getButtonClasses(isNextDisabled)}
      >
        Next
      </button>
    </div>
  );
};

