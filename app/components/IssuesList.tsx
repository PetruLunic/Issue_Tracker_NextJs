import {Badge, Box, Flex, Separator, Text} from "@radix-ui/themes";
import {BadgeColor, Issue, StatusText} from "@/app/types";
import Link from "next/link";


interface Props{
    issues: Issue[]
}

export default async function IssuesList({issues}: Props) {

 return (
  <Flex direction="column"  >
    {issues.map((issue, i) =>
        <>
          {/*{i !== 0 && <Separator size="4"/>}*/}
          <Link key={issue.id} href={`/issues/${issue.id}`} className="py-4 ml-3 hover:bg-gray-100 rounded">
            <Box>
                <Text as="div">{issue.title}</Text>
                <Badge className="mt-2" color={BadgeColor[issue.status]}>
                  {StatusText[issue.status]}
                </Badge>
            </Box>
          </Link>
        </>
    )}
  </Flex>
 );
};