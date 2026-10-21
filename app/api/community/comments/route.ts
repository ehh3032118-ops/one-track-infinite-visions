import { NextRequest, NextResponse } from "next/server";
import { getCommunityComments, addCommunityComment } from "@/lib/communityStore";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "postId is required" },
        { status: 400 }
      );
    }

    const comments = await getCommunityComments(postId);
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error("GET /api/community/comments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, text, author, id, createdAt, timeAgo } = body;

    if (!postId || !text || !text.trim()) {
      return NextResponse.json(
        { success: false, error: "postId and text are required" },
        { status: 400 }
      );
    }

    const comment = await addCommunityComment(
      postId,
      author || { name: "익명 크리에이터" },
      text,
      id ? String(id).trim() : undefined,
      createdAt ? String(createdAt).trim() : undefined,
      timeAgo ? String(timeAgo).trim() : undefined
    );

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error("POST /api/community/comments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
