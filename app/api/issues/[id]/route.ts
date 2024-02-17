import prisma from "@/prisma/client"
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try{
    const {id} = params;

    const issue = await prisma.issue.findFirst({where: {id: parseInt(id)}})

    return NextResponse.json(issue);
  } catch(e) {
    return NextResponse.json("Server error at get issue", {status: 500});
  }
}