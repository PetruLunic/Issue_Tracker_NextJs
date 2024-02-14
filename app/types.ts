import {z} from "zod";
import {createIssueSchema} from "@/app/validationSchemas";


export type CreateIssue = z.infer<typeof createIssueSchema>