import {Issue, IssueStatus, RawIssue} from "@/app/types";
import axios, {AxiosPromise} from "axios";

const baseUrl = "http://localhost:3000/api/issues"

export const getIssues = ({sort = "asc", limit, page, status, orderBy}: {sort?: "asc" | "desc", limit?: number, page?: number, status?: IssueStatus, orderBy?: string | null} = {}): AxiosPromise<Issue[]> => {
  try {
    return axios.get(baseUrl,
        {params: {
            sort,
            ...(limit ? { limit } : {}),
            ...(page ? { page } : {}),
            ...(status ? {status} : {}),
            ...(orderBy ? {orderBy} : {})
          }});
  } catch(e) {
    throw "Error at getting issues";
  }
}

export const createIssue = (data: RawIssue): AxiosPromise<Issue> => {
  try {
    return axios.post(baseUrl, data);
  } catch(e) {
    throw "Error at creating issue";
  }
}

export const getIssuesCount = (): AxiosPromise<{open: number, inProgress: number, closed: number, total: number}> => {
  try {
    return axios.get(baseUrl + "/count");
  } catch(e) {
    throw "Error at getting issues count";
  }
}

export const getIssue = (id: string): AxiosPromise<Issue> => {
  try {
    return axios.get(baseUrl + "/" + id);
  } catch(e) {
    throw "Error at getting issues count";
  }
}