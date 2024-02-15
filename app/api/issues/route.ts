import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {createIssueSchema} from "@/app/validationSchemas";

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
    const sort = searchParams.get("sort") === "desc" ? "desc" : "asc";

    let issues;

    if (limit) {
      issues = await prisma.issue.findMany({orderBy: [{id: sort}], take: parseInt(limit)});
    } else {
      issues = await prisma.issue.findMany({orderBy: [{id: sort}]});
    }

    return NextResponse.json(issues);
  } catch(e) {
    return NextResponse.json("Server error at get issues", {status: 500});
  }

}