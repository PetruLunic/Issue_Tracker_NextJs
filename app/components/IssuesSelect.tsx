"use client"

import {Select} from "@radix-ui/themes";
import {useWritableSearchParams} from "@/app/hooks/useWritableSearchParams";
import {useSearchParams} from "next/navigation";

export default function IssuesSelect() {
  const setQuery = useWritableSearchParams();
  const queryParams = useSearchParams();

  const onChange = ((value: string) => {
    setQuery.set({"status": value, "page": "1"});
  })

 return (
     <Select.Root onValueChange={onChange} defaultValue={queryParams.get("status") || "all"}>
       <Select.Trigger />
       <Select.Content>
         <Select.Group>
           <Select.Item value="all">All</Select.Item>
           <Select.Item value="OPEN">Open</Select.Item>
           <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
           <Select.Item value="CLOSED">Closed</Select.Item>
         </Select.Group>
       </Select.Content>
     </Select.Root>
 );
};