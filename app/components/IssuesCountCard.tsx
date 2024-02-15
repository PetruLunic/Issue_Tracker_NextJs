import {Card, Flex, Text} from "@radix-ui/themes";
import {IssueStatus, StatusText} from "@/app/types";


interface Props{
  count: number,
  status: IssueStatus
}



export default async function IssuesCountCard({count, status}: Props) {

 return (
     <Card className="space-x-10">
       <Flex gap="3" direction="column">
         <Text as="div" size="3" weight="medium" className="mb-10">
           {StatusText[status]} Issues
         </Text>
         <Text weight="bold" as="div" size="5">
           {count}
         </Text>
       </Flex>
     </Card>
 );
};