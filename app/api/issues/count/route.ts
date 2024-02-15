import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";


export async function GET() {
  try {
    const open = await prisma.issue.count({where: {status: "OPEN"}});
    const inProgress = await prisma.issue.count({where: {status: "IN_PROGRESS"}});
    const closed = await prisma.issue.count({where: {status: "CLOSED"}});

    return NextResponse.json({open, inProgress, closed});
  } catch (e) {
    return NextResponse.json("Server error at get issues", {status: 500});
  }
}
