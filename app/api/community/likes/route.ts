import { NextRequest, NextResponse } from "next/server";
import { togglePostLike } from "@/lib/communityStore";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "postId is required" },
        { status: 400 }
      );
    }

    const likes = await togglePostLike(postId);
    return NextResponse.json({ success: true, likes });
  } catch (error) {
    console.error("POST /api/community/likes error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
