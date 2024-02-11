"use client";

import {Button, Callout, TextField, Text} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchemas";
import {z} from "zod";

type IssueForm = z.infer<typeof createIssueSchema>

export default function Page() {
  const {register,
    control,
    handleSubmit,
    formState: {errors}} = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

 return (
     <div className="max-w-xl space-y-3">
         {error && <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
         </Callout.Root>}
       <form className="space-y-3"
           onSubmit={handleSubmit(async (data) => {
             try{
               await axios.post("/api/issues", data);
               router.push("/issues");
             } catch (e) {
               setError("An unexpected error occurred");
             }
           })}
       >
         {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
         <TextField.Root>
           <TextField.Input placeholder="Title" {...register("title")}/>
         </TextField.Root>
         {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
         <Controller
             render={({ field }) => <SimpleMDE placeholder="Description" {...field}/>}
             control={control}
             name="description"
         />
         <Button type="submit">Submit New Issue</Button>
       </form>
     </div>
 );
};