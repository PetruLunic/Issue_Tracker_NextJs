import {Badge, Card, Flex, Heading, Text} from "@radix-ui/themes";
import {getIssue} from "@/app/services/issueAPI";
import {BadgeColor, StatusText} from "@/app/types";


interface Props{
 params: {id: string}
}

export default async function Page({params}: Props) {
 const {title, status, description, createdAt} = await getIssue(params.id).then(res => res.data);

 return (
  <Flex direction="column" gap="2" align="start">
   <Heading className="mb-3" as="h2">{title}</Heading>
    <Flex gap="4">
      <Badge color={BadgeColor[status]}>{StatusText[status]}</Badge>
      <Text>{new Date(createdAt).toDateString()}</Text>
    </Flex>
    <Card className="mt-3 w-full">
      <Text as="div">
        {description}
      </Text>
    </Card>
  </Flex>
 );
};