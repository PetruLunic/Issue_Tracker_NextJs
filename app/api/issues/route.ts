import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {createIssueSchema} from "@/app/validationSchemas";
import {isIssueProperty, isIssueStatus, Issue, IssueProperty, IssueStatus} from "@/app/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, {status: 400});

    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, {status: 201});
  } catch(e) {
    return NextResponse.json("Server error at post issues", {status: 500});
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const sort = searchParams.get("sort") === "desc" ? "desc" : "asc";
    const status = searchParams.get("status");
    const orderBy = searchParams.get("orderBy") || "id" as IssueProperty;

    const skip = limit && page ? (parseInt(page) - 1) * parseInt(limit) : null;

    const issues: Issue[] = await prisma.issue.findMany({
      orderBy: [{[orderBy]: sort}],
      ...(skip ? {skip} : {}),
      ...(limit ? {take: parseInt(limit)} : {}),
      ...(status && isIssueStatus(status) ? {where: {status}} : {})
    });

    return NextResponse.json(issues);
  } catch(e) {
    return NextResponse.json("Server error at get issues", {status: 500});
  }

}