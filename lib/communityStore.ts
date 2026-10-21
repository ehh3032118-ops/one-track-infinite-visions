import { CommunityPost, CommunityComment, CommunityCategory } from "@/types";
import { COMMUNITY_POSTS } from "@/data/mockData";
import { supabase, isSupabaseConfigured } from "./supabase";

// Initial seed comments
const INITIAL_COMMENTS: Record<string, CommunityComment[]> = {
  "post-1": [
    {
      id: "comment-1-1",
      postId: "post-1",
      author: {
        name: "Studio 37",
        avatarUrl:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
        role: "Graphic Designer",
      },
      text: "신스 아르페지오가 고조되는 02:14 부근에 비주얼 글리치를 과감하게 넣는 걸 추천드려요!",
      timeAgo: "1시간 전",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "comment-1-2",
      postId: "post-1",
      author: {
        name: "Chloe J.",
        avatarUrl:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80",
        role: "Neo Soul Artist",
      },
      text: "색감을 네온 라임과 딥 블루로 대비시키면 사운드 질감이 극대화될 것 같습니다.",
      timeAgo: "30분 전",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
  ],
  "post-2": [
    {
      id: "comment-2-1",
      postId: "post-2",
      author: {
        name: "WEE.S",
        avatarUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
        role: "3D Artist",
      },
      text: "블렌더 지오메트리 노드로 파도 텍스처 실험한 프로젝트가 있는데 포트폴리오 디엠 보내드렸습니다!",
      timeAgo: "2시간 전",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
};

// Global in-memory cache for fallback when Supabase is not yet linked
declare global {
  // eslint-disable-next-line no-var
  var __globalCommunityPosts: CommunityPost[] | undefined;
  // eslint-disable-next-line no-var
  var __globalCommunityComments: Record<string, CommunityComment[]> | undefined;
}

if (!global.__globalCommunityPosts) {
  global.__globalCommunityPosts = [...COMMUNITY_POSTS];
}
if (!global.__globalCommunityComments) {
  global.__globalCommunityComments = { ...INITIAL_COMMENTS };
}

export async function getCommunityPosts(category?: CommunityCategory): Promise<CommunityPost[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (category && category !== "전체") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          category: row.category as CommunityCategory,
          author: {
            name: row.author_name,
            avatarUrl: row.author_avatar,
            role: row.author_role || undefined,
            verified: Boolean(row.author_verified),
          },
          timeAgo: formatTimeAgo(row.created_at),
          title: row.title,
          content: row.content,
          tags: row.tags || [],
          thumbnailUrl: row.thumbnail_url || undefined,
          likes: row.likes || 0,
          comments: row.comments_count || 0,
          views: row.views || 0,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.warn("Supabase posts fetch failed, falling back to local memory store:", e);
    }
  }

  // Fallback memory store
  const allPosts = global.__globalCommunityPosts || COMMUNITY_POSTS;
  if (!category || category === "전체") {
    return allPosts;
  }
  return allPosts.filter((p) => p.category === category);
}

export async function createCommunityPost(
  newPost: Omit<CommunityPost, "id" | "timeAgo" | "likes" | "comments" | "views" | "createdAt">
): Promise<CommunityPost> {
  const id = `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const post: CommunityPost = {
    ...newPost,
    id,
    timeAgo: "방금 전",
    likes: 0,
    comments: 0,
    views: 1,
    createdAt: now,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("posts").insert([
        {
          id,
          category: post.category,
          author_name: post.author.name,
          author_avatar: post.author.avatarUrl,
          author_role: post.author.role,
          author_verified: post.author.verified || false,
          title: post.title,
          content: post.content,
          tags: post.tags,
          thumbnail_url: post.thumbnailUrl,
          likes: 0,
          comments_count: 0,
          views: 1,
          created_at: now,
        },
      ]);
      if (error) {
        console.error("Supabase post insert error:", error);
      }
    } catch (e) {
      console.warn("Supabase post insert failed, using memory store:", e);
    }
  }

  // Always update in-memory cache as well
  if (global.__globalCommunityPosts) {
    global.__globalCommunityPosts = [post, ...global.__globalCommunityPosts];
  }

  return post;
}

export async function getCommunityComments(postId: string): Promise<CommunityComment[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          postId: row.post_id,
          author: {
            name: row.author_name,
            avatarUrl: row.author_avatar || undefined,
            role: row.author_role || undefined,
          },
          text: row.content,
          timeAgo: formatTimeAgo(row.created_at),
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.warn("Supabase comments fetch failed, using memory store:", e);
    }
  }

  // Fallback memory store
  const comments = global.__globalCommunityComments?.[postId] || [];
  return comments;
}

export async function addCommunityComment(
  postId: string,
  author: { name: string; avatarUrl?: string; role?: string },
  text: string
): Promise<CommunityComment> {
  const id = `comment-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const comment: CommunityComment = {
    id,
    postId,
    author: {
      name: author.name.trim() || "익명 크리에이터",
      avatarUrl:
        author.avatarUrl ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      role: author.role || "Visual Explorer",
    },
    text: text.trim(),
    timeAgo: "방금 전",
    createdAt: now,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("comments").insert([
        {
          id,
          post_id: postId,
          author_name: comment.author.name,
          author_avatar: comment.author.avatarUrl,
          author_role: comment.author.role,
          content: comment.text,
          created_at: now,
        },
      ]);
      if (error) {
        console.error("Supabase comment insert error:", error);
      }
    } catch (e) {
      console.warn("Supabase comment insert failed, using memory store:", e);
    }
  }

  // Update in-memory comments
  if (global.__globalCommunityComments) {
    const list = global.__globalCommunityComments[postId] || [];
    global.__globalCommunityComments[postId] = [...list, comment];
  }

  // Increment comment count on post
  if (global.__globalCommunityPosts) {
    const targetPost = global.__globalCommunityPosts.find((p) => p.id === postId);
    if (targetPost) {
      targetPost.comments += 1;
    }
  }

  return comment;
}

export async function togglePostLike(postId: string): Promise<number> {
  let newLikes = 0;

  if (global.__globalCommunityPosts) {
    const targetPost = global.__globalCommunityPosts.find((p) => p.id === postId);
    if (targetPost) {
      targetPost.likes += 1;
      newLikes = targetPost.likes;
    }
  }

  if (isSupabaseConfigured && supabase && newLikes > 0) {
    try {
      await supabase.rpc("increment_likes", { post_id: postId });
    } catch (e) {
      console.warn("Supabase like RPC failed:", e);
    }
  }

  return newLikes;
}

function formatTimeAgo(isoString?: string): string {
  if (!isoString) return "방금 전";
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "방금 전";
  if (diffMins < 60) return `${diffMins}분 전`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
}
