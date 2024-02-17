import {getIssues, getIssuesCount} from "@/app/services/issueAPI";
import {Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import IssuesCountCard from "@/app/components/IssuesCountCard";
import IssuesList from "@/app/components/IssuesList";
import IssuesChart from "@/app/components/IssuesChart";

export default async function Home() {
  const issues = await getIssues({sort: "desc", limit: 7}).then(res => res.data);
  const issuesCount = await getIssuesCount().then(res => res.data);

  return (
    <Grid columns="2" gap="6">
      <Flex direction="column" gap="3">
        <Flex gap="4" className="w-full">
          <IssuesCountCard count={issuesCount.open} status="OPEN"/>
          <IssuesCountCard count={issuesCount.inProgress} status="IN_PROGRESS"/>
          <IssuesCountCard count={issuesCount.closed} status="CLOSED"/>
        </Flex>
        <Card>
          <IssuesChart issuesCount={issuesCount}/>
        </Card>
      </Flex>
      <Card className="w-full p-0">
        <Heading as="h3" style={{marginBottom: "20px"}}>Latest Issues</Heading>
        <IssuesList issues={issues}/>
      </Card>
    </Grid>
  );
}
