import {z} from "zod";
import {createIssueSchema} from "@/app/validationSchemas";

export type IssueStatus = "OPEN" | "CLOSED" | "IN_PROGRESS";

export type RawIssue = z.infer<typeof createIssueSchema>;

export interface Issue extends RawIssue{
  id: number;
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum BadgeColor {
  "OPEN" = "red",
  "IN_PROGRESS"= "orange",
  "CLOSED" = "green"
}

export enum StatusText {
  "OPEN" = "Open",
  "IN_PROGRESS" = "In Progress",
  "CLOSED" = "Closed"
}

export enum StatusProperty {
  "OPEN" = "open",
  "IN_PROGRESS" = "inProgress",
  "CLOSED" = "closed"
}