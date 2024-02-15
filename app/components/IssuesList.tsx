import {Badge, Box, Flex, Separator, Text} from "@radix-ui/themes";
import {BadgeColor, Issue, StatusText} from "@/app/types";


interface Props{
    issues: Issue[]
}

export default async function IssuesList({issues}: Props) {

 return (
  <Flex direction="column" gap="3" >
    {issues.map((issue, i) =>
        <>
          {i !== 0 && <Separator size="4"/>}
          <Box className="ml-3" key={issue.id}>
            <Text as="div">{issue.title}</Text>
            <Badge className="mt-2" color={BadgeColor[issue.status]}>{StatusText[issue.status]}</Badge>
          </Box>
        </>
    )}
  </Flex>
 );
};