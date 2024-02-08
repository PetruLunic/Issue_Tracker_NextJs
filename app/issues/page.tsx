import {Button} from "@radix-ui/themes";
import Link from "next/link";


export default async function Page() {

 return (
  <div>
    <Button variant="solid"><Link href="/issues/new">New Issue</Link></Button>
  </div>
 );
};