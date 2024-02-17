import {z} from "zod";
import {createIssueSchema} from "@/app/validationSchemas";

const issueStatus = ["OPEN", "CLOSED", "IN_PROGRESS"] as const;

export type IssueStatus = typeof issueStatus[number];

export function isIssueStatus(string: string | null | undefined): string is IssueStatus {
  return !!issueStatus.find(status => status === string);
}

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
  "all" = "total",
  "OPEN" = "open",
  "IN_PROGRESS" = "inProgress",
  "CLOSED" = "closed"
}