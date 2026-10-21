import { NextRequest, NextResponse } from "next/server";
import { getCommunityPosts, createCommunityPost } from "@/lib/communityStore";
import { CommunityCategory } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = (searchParams.get("category") || "전체") as CommunityCategory;

    const posts = await getCommunityPosts(category);
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("GET /api/community/posts error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, tags, author, thumbnailUrl } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    const post = await createCommunityPost({
      title: title.trim(),
      content: content.trim(),
      category: category || "피드백 & 질문",
      tags: tags || ["#창작", "#커뮤니티"],
      author: {
        name: author?.name || "방문자 크리에이터",
        avatarUrl:
          author?.avatarUrl ||
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        role: author?.role || "Visual Explorer",
        verified: false,
      },
      thumbnailUrl: thumbnailUrl || undefined,
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("POST /api/community/posts error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    );
  }
}
