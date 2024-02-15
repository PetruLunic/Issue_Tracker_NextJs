import {Button, Container, DropdownMenu, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssuesTable from "@/app/components/IssuesTable";
import ReactPaginate from "react-paginate";


export default async function Page() {
  const issues = await fetch("http://localhost:3000/api/issues").then(res => res.json());

 return (
  <Flex direction="column" gap="4">
    <Flex justify="between">
      asodihf
      <Button variant="solid"><Link href="/issues/new">New Issue</Link></Button>
    </Flex>
    <IssuesTable issues={issues}/>
    {/*<ReactPaginate pageCount={10}/>*/}
  </Flex>
 );
};