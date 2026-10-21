import { CommunityPost, CommunityComment, CommunityCategory } from "@/types";
import { COMMUNITY_POSTS } from "@/data/mockData";
import { supabase, isSupabaseConfigured } from "./supabase";

// Global cloud-hosted JSON DB (active out-of-the-box for all visitors across devices)
const CLOUD_STORAGE_URL = "https://extendsclass.com/api/json-storage/bin/eadffdf";

interface CloudStorePayload {
  posts: CommunityPost[];
  comments: Record<string, CommunityComment[]>;
}

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

// Global in-memory cache with timestamp to prevent thrashing and race conditions
declare global {
  // eslint-disable-next-line no-var
  var __globalCommunityPosts: CommunityPost[] | undefined;
  // eslint-disable-next-line no-var
  var __globalCommunityComments: Record<string, CommunityComment[]> | undefined;
  // eslint-disable-next-line no-var
  var __globalCommunityLastFetched: number | undefined;
}

if (!global.__globalCommunityPosts) {
  global.__globalCommunityPosts = [...COMMUNITY_POSTS];
}
if (!global.__globalCommunityComments) {
  global.__globalCommunityComments = { ...INITIAL_COMMENTS };
}
if (!global.__globalCommunityLastFetched) {
  global.__globalCommunityLastFetched = 0;
}

// Helper: Post unique content signature
function getPostSig(p: CommunityPost): string {
  const author = (p.author?.name || "").trim().toLowerCase();
  const title = (p.title || "").trim().toLowerCase();
  const contentSnippet = (p.content || "").trim().slice(0, 50).toLowerCase();
  return `${author}::${title}::${contentSnippet}`;
}

// Helper: Comment unique content signature
function getCommentSig(c: CommunityComment): string {
  const author = (c.author?.name || "").trim().toLowerCase();
  const text = (c.text || "").trim().toLowerCase();
  return `${c.postId}::${author}::${text}`;
}

// Helper: Deduplicate post list by both ID and Content Signature
function deduplicatePosts(posts: CommunityPost[]): CommunityPost[] {
  const seenIds = new Set<string>();
  const seenSigs = new Set<string>();
  const result: CommunityPost[] = [];

  for (const post of posts) {
    if (!post || !post.id) continue;
    const sig = getPostSig(post);
    if (!seenIds.has(post.id) && !seenSigs.has(sig)) {
      seenIds.add(post.id);
      seenSigs.add(sig);
      result.push(post);
    }
  }

  // Sort newest first
  result.sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    return timeB - timeA;
  });

  return result;
}

// Serialized write queue to avoid race conditions when multiple users write simultaneously
let writeQueue = Promise.resolve();
function enqueueWrite<T>(fn: () => Promise<T>): Promise<T> {
  const res = writeQueue.then(fn, fn);
  writeQueue = res.then(() => {}, () => {});
  return res;
}

// Helper: Fetch shared data from cloud database with short-lived cache
async function fetchFromCloudStore(forceFresh: boolean = false): Promise<CloudStorePayload> {
  const now = Date.now();
  // Return in-memory cache if fresh (within 2 seconds) and not forced
  if (
    !forceFresh &&
    global.__globalCommunityPosts &&
    global.__globalCommunityPosts.length > 0 &&
    global.__globalCommunityComments &&
    now - (global.__globalCommunityLastFetched || 0) < 2000
  ) {
    return {
      posts: global.__globalCommunityPosts,
      comments: global.__globalCommunityComments,
    };
  }

  try {
    const res = await fetch(CLOUD_STORAGE_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.posts) && data.comments) {
        // Merge cloud data with any active in-memory cache so no in-flight posts are dropped
        const mergedPosts = deduplicatePosts([...data.posts, ...(global.__globalCommunityPosts || [])]);
        const mergedComments = { ...(global.__globalCommunityComments || INITIAL_COMMENTS), ...data.comments };

        global.__globalCommunityPosts = mergedPosts;
        global.__globalCommunityComments = mergedComments;
        global.__globalCommunityLastFetched = now;

        return { posts: mergedPosts, comments: mergedComments };
      }
    }
  } catch (err) {
    console.warn("Cloud store fetch error, using local fallback cache:", err);
  }

  return {
    posts: global.__globalCommunityPosts || [...COMMUNITY_POSTS],
    comments: global.__globalCommunityComments || { ...INITIAL_COMMENTS },
  };
}

// Helper: Update shared data to cloud database
async function updateCloudStore(payload: CloudStorePayload): Promise<boolean> {
  try {
    const cleanPayload: CloudStorePayload = {
      posts: deduplicatePosts(payload.posts),
      comments: payload.comments,
    };

    const res = await fetch(CLOUD_STORAGE_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanPayload),
    });

    if (res.ok) {
      global.__globalCommunityPosts = cleanPayload.posts;
      global.__globalCommunityComments = cleanPayload.comments;
      global.__globalCommunityLastFetched = Date.now();
      return true;
    }
  } catch (err) {
    console.warn("Cloud store update error:", err);
  }
  return false;
}

export async function getCommunityPosts(category?: CommunityCategory): Promise<CommunityPost[]> {
  // 1. If Supabase is configured, use Supabase
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
      console.warn("Supabase posts fetch failed, falling back to cloud store:", e);
    }
  }

  // 2. Multi-user shared cloud database (with memory cache fallback)
  const cloudData = await fetchFromCloudStore(false);
  const posts = cloudData.posts;

  if (!category || category === "전체") {
    return posts;
  }
  return posts.filter((p) => p.category === category);
}

export async function createCommunityPost(
  newPost: Partial<CommunityPost> & {
    title: string;
    content: string;
    category?: CommunityCategory;
    tags?: string[];
    author?: { name: string; avatarUrl?: string; role?: string; verified?: boolean };
    thumbnailUrl?: string;
  }
): Promise<CommunityPost> {
  const id = newPost.id && String(newPost.id).trim()
    ? String(newPost.id).trim()
    : `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const now = newPost.createdAt || new Date().toISOString();

  const post: CommunityPost = {
    id,
    category: (newPost.category as CommunityCategory) || "피드백 & 질문",
    author: {
      name: newPost.author?.name || "방문자 크리에이터",
      avatarUrl:
        newPost.author?.avatarUrl ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      role: newPost.author?.role || "Visual Explorer",
      verified: Boolean(newPost.author?.verified),
    },
    timeAgo: newPost.timeAgo || "방금 전",
    title: newPost.title.trim(),
    content: newPost.content.trim(),
    tags: newPost.tags || ["#창작", "#커뮤니티"],
    thumbnailUrl: newPost.thumbnailUrl || undefined,
    likes: newPost.likes || 0,
    comments: newPost.comments || 0,
    views: newPost.views || 1,
    createdAt: now,
  };

  // 1. Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("posts").insert([
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
    } catch (e) {
      console.warn("Supabase post insert failed:", e);
    }
  }

  // 2. Serialized Cloud store update
  await enqueueWrite(async () => {
    try {
      const cloudData = await fetchFromCloudStore(true);
      const postSig = getPostSig(post);

      // Filter out any duplicate with the same ID or same Content Signature
      const filtered = cloudData.posts.filter((p) => p.id !== post.id && getPostSig(p) !== postSig);
      cloudData.posts = [post, ...filtered];

      await updateCloudStore(cloudData);
    } catch (err) {
      console.warn("Failed to update cloud store for post:", err);
    }
  });

  return post;
}

export async function getCommunityComments(postId: string): Promise<CommunityComment[]> {
  // 1. Supabase if configured
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
      console.warn("Supabase comments fetch failed:", e);
    }
  }

  // 2. Cloud store fetch
  const cloudData = await fetchFromCloudStore(false);
  const comments = cloudData.comments[postId] || [];
  return comments;
}

export async function addCommunityComment(
  postId: string,
  author: { name: string; avatarUrl?: string; role?: string },
  text: string,
  clientCommentId?: string,
  clientCreatedAt?: string,
  clientTimeAgo?: string
): Promise<CommunityComment> {
  const id = clientCommentId && String(clientCommentId).trim()
    ? String(clientCommentId).trim()
    : `comment-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const now = clientCreatedAt || new Date().toISOString();

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
    timeAgo: clientTimeAgo || "방금 전",
    createdAt: now,
  };

  // 1. Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("comments").insert([
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
    } catch (e) {
      console.warn("Supabase comment insert failed:", e);
    }
  }

  // 2. Serialized Cloud store update
  await enqueueWrite(async () => {
    try {
      const cloudData = await fetchFromCloudStore(true);
      const list = cloudData.comments[postId] || [];
      const commentSig = getCommentSig(comment);

      // Deduplicate comments
      const filtered = list.filter((c) => c.id !== comment.id && getCommentSig(c) !== commentSig);
      cloudData.comments[postId] = [...filtered, comment];

      // Increment comments count on post
      const targetPost = cloudData.posts.find((p) => p.id === postId);
      if (targetPost) {
        targetPost.comments = (cloudData.comments[postId] || []).length;
      }

      await updateCloudStore(cloudData);
    } catch (err) {
      console.warn("Failed to sync comment to cloud store:", err);
    }
  });

  return comment;
}

export async function togglePostLike(postId: string): Promise<number> {
  let newLikes = 0;

  await enqueueWrite(async () => {
    try {
      const cloudData = await fetchFromCloudStore(true);
      const targetPost = cloudData.posts.find((p) => p.id === postId);
      if (targetPost) {
        targetPost.likes = (targetPost.likes || 0) + 1;
        newLikes = targetPost.likes;
        await updateCloudStore(cloudData);
      }
    } catch (err) {
      console.warn("Failed to sync like to cloud store:", err);
    }
  });

  // Supabase if configured
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
