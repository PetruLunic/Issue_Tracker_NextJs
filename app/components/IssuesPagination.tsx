"use client"

import ReactPaginate from "react-paginate";
import {useWritableSearchParams} from "@/app/hooks/useWritableSearchParams";
import {useMemo} from "react";
import {useSearchParams} from "next/navigation";

interface Props{
  pageCount: number
}

export default function IssuesPagination({pageCount}: Props) {
  const setParams = useWritableSearchParams();
  const queryParams = useSearchParams();

  const handlePageClick = (event: {selected: any}) => {
    setParams.set({"page": event.selected + 1});
  };

  const forcePage = useMemo(() => {
    const page = queryParams.get("page");

    return page ? parseInt(page) - 1 : undefined;
  }, [queryParams])

  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        forcePage={forcePage}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-2 mt-3"
        pageLinkClassName="py-2 px-4 hover:bg-sky-200 rounded border"
        nextLinkClassName="py-2 px-4 hover:bg-sky-200 rounded border"
        previousLinkClassName="py-2 px-4 hover:bg-sky-200 rounded border"
        activeLinkClassName="bg-sky-500 rounded hover:bg-sky-500"
    />
  );
};