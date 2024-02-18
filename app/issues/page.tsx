"use client";

import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssuesTable from "@/app/components/IssuesTable";
import IssuesPagination from "@/app/components/IssuesPagination";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {isIssueStatus, Issue, IssueStatus, StatusProperty} from "@/app/types";
import {getIssues, getIssuesCount} from "@/app/services/issueAPI";
import IssuesSelect from "@/app/components/IssuesSelect";
import {useWritableSearchParams} from "@/app/hooks/useWritableSearchParams";

const limit = 10;

export default function Page() {
  const queryParams = useSearchParams();
  const setParams = useWritableSearchParams();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issueLengths, setIssueLengths] =
      useState<{open: number, inProgress: number, closed: number, total: number}>({open: 0, closed: 0, inProgress: 0, total: 0});
  const [totalLength, setTotalLength] = useState(0);
  const [status, setStatus] = useState<IssueStatus | "all">("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc")

  // set status in state when changing status query param
  useEffect(() => {
    const status = queryParams.get("status");

    if (status && (isIssueStatus(status) || status === "all")) {
      setStatus(status);
    }
  }, [queryParams]);

  // useEffect(() => {
  //   const sort = queryParams.get("sort");
  //
  //   if (sort && (sort === "asc" || sort === "desc")){
  //     setSort(sort);
  //   }
  // }, [queryParams])

  // changing the length of the issues when changing the status
  useEffect(() => {
    if (!status) return;

    setTotalLength(issueLengths[StatusProperty[status]])
  }, [status, issueLengths]);

  useEffect(() => {
    getIssuesCount().then(res => {
      setIssueLengths(res.data);
    });
  }, []);

  useEffect(() => {
    getIssues({
      limit,
      page: parseInt(queryParams.get("page") || "1"),
      status: queryParams.get("status") as IssueStatus,
      sort: queryParams.get("sort") as "asc" | "desc",
      orderBy: queryParams.get("orderBy")
    })
        .then(res => setIssues(res.data));
  }, [queryParams]);

 return (
  <Flex direction="column" gap="4">
    <Flex justify="between">
      <IssuesSelect/>
      <Button variant="solid"><Link href="/issues/new">New Issue</Link></Button>
    </Flex>
    <IssuesTable issues={issues}/>
    <IssuesPagination pageCount={Math.ceil(totalLength/limit)}/>
  </Flex>
 );
};