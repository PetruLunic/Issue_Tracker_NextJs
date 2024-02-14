import {CreateIssue} from "@/app/types";
import axios from "axios";


export const createIssue = (data: CreateIssue) => {
  try {
    return axios.post("/api/issues", data);
  } catch(e) {
    throw "Error at creating issue";
  }
}