import {Issue, RawIssue} from "@/app/types";
import axios, {Axios, AxiosPromise} from "axios";

export const getIssues = ({sort = "asc", limit = 10}: {sort?: "asc" | "desc", limit?: number} = {}): AxiosPromise<Issue[]> => {
  try {
    return axios.get(`http://localhost:3000/api/issues/?sort=${sort}&limit=${limit}`);
  } catch(e) {
    throw "Error at getting issues";
  }
}

export const createIssue = (data: RawIssue): AxiosPromise<Issue> => {
  try {
    return axios.post("/api/issues", data);
  } catch(e) {
    throw "Error at creating issue";
  }
}

export const getIssuesCount = (): AxiosPromise<{open: number, inProgress: number, closed: number}> => {
  try {
    return axios.get(`http://localhost:3000/api/issues/count`);
  } catch(e) {
    throw "Error at getting issues count";
  }
}