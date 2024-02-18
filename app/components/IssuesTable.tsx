import {Badge, Flex, Table} from "@radix-ui/themes";
import {BadgeColor, Issue} from "@/app/types";
import {useRouter, useSearchParams} from "next/navigation";
import {useWritableSearchParams} from "@/app/hooks/useWritableSearchParams";
import {PiArrowDown, PiArrowUp} from "react-icons/pi";


interface Props{
  issues: Issue[],
}

export default function IssuesTable({issues}: Props) {
  const router = useRouter();
  const setQuery = useWritableSearchParams();
  const queryParams = useSearchParams();

  const onHeaderClick = (column: string) => {
    return () => {
      const sort = queryParams.get("orderBy") === column
          ?  queryParams.get("sort") === "asc" ? "desc" : "asc"
          : "asc"

      setQuery.set({
        "sort": sort,
        "orderBy": column,
        "page": "1",
      });
    }
  }

 return (
   <Table.Root variant="surface">
     <Table.Header>
       <Table.Row>
         <Table.ColumnHeaderCell className="cursor-pointer hover:bg-gray-100" onClick={onHeaderClick("title")}>
           <Flex gap="1" align="center">
             Issue {queryParams.get("orderBy") === "title" ? queryParams.get("sort") === "asc" ? <PiArrowUp /> : <PiArrowDown/> : ""}
           </Flex>
         </Table.ColumnHeaderCell>
         <Table.ColumnHeaderCell className="cursor-pointer hover:bg-gray-100" onClick={onHeaderClick("status")}>
           <Flex gap="2" align="center">
             Status {queryParams.get("orderBy") === "status" ? queryParams.get("sort") === "asc" ? <PiArrowUp /> : <PiArrowDown/> : ""}
           </Flex>
         </Table.ColumnHeaderCell>
         <Table.ColumnHeaderCell className="cursor-pointer hover:bg-gray-100" onClick={onHeaderClick("createdAt")}>
           <Flex gap="2" align="center">
             Created At {queryParams.get("orderBy") === "createdAt" ? queryParams.get("sort") === "asc" ? <PiArrowUp /> : <PiArrowDown/> : ""}
           </Flex>
         </Table.ColumnHeaderCell>
       </Table.Row>
     </Table.Header>

     <Table.Body>
       {issues.map(issue =>
         <Table.Row className="hover:bg-gray-100 cursor-pointer" onClick={() => router.push(`issues/${issue.id}`)} key={issue.id}>
           <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
           <Table.Cell><Badge color={BadgeColor[issue.status]}>{issue.status}</Badge></Table.Cell>
           <Table.Cell>{new Date(issue.createdAt).toDateString()}</Table.Cell>
         </Table.Row>
       )}
     </Table.Body>
   </Table.Root>
 );
};