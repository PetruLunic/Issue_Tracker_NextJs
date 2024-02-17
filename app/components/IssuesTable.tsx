import {Badge, Table} from "@radix-ui/themes";
import {BadgeColor, Issue} from "@/app/types";


interface Props{
  issues: Issue[],
}

export default function IssuesTable({issues}: Props) {

 return (
     <Table.Root variant="surface">
       <Table.Header>
         <Table.Row>
           <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
           <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
           <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
         </Table.Row>
       </Table.Header>

       <Table.Body>
         {issues.map(issue =>
             <Table.Row key={issue.id}>
               <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
               <Table.Cell><Badge color={BadgeColor[issue.status]}>{issue.status}</Badge></Table.Cell>
               <Table.Cell>{new Date(issue.createdAt).toDateString()}</Table.Cell>
             </Table.Row>
         )}
       </Table.Body>
     </Table.Root>
 );
};