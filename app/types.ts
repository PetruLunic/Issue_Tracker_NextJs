import {z} from "zod";
import {createIssueSchema} from "@/app/validationSchemas";

const issueStatus = ["OPEN", "CLOSED", "IN_PROGRESS"] as const;

const issueProperties = ["id", "title", "status", "description", "createdAt", "updatedAt"] as const;

export type IssueProperty = typeof issueProperties[number];

export type IssueStatus = typeof issueStatus[number];

export function isIssueStatus(string: string | null | undefined): string is IssueStatus {
  return !!issueStatus.find(status => status === string);
}

export function isIssueProperty(string: string): string is IssueProperty {
  return !!issueProperties.find(prop => prop === string);
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