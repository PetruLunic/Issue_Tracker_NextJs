"use client";

import {Button, Callout, TextField, Text} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import {RawIssue} from "@/app/types";
import {createIssue} from "@/app/services/issueAPI";



export default function Page() {
  const {register,
    control,
    handleSubmit,
    formState: {errors, isSubmitting}} = useForm<RawIssue>({resolver: zodResolver(createIssueSchema)});
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try{
      await createIssue(data);
      router.push("/issues");
    } catch (e) {
      setError(e as string);
    }
  })

 return (
     <div className="max-w-xl space-y-3">
         {error && <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
         </Callout.Root>}
       <form className="space-y-3" onSubmit={onSubmit}>
         <ErrorMessage>{errors.title?.message}</ErrorMessage>
         <TextField.Root>
           <TextField.Input placeholder="Title" {...register("title")}/>
         </TextField.Root>
         <ErrorMessage>{errors.description?.message}</ErrorMessage>
         <Controller
             render={({ field }) => <SimpleMDE placeholder="Description" {...field}/>}
             control={control}
             name="description"
         />
         <Button disabled={isSubmitting} type="submit">
           Submit New Issue
           {isSubmitting && <Spinner/>}
         </Button>
       </form>
     </div>
 );
};