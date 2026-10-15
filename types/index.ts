export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
  coverUrl: string;
  audioUrl?: string;
  genre?: string;
  visionCount?: number;
  description?: string;
  bpm?: number;
  releaseDate?: string;
}

export interface TrackCreation {
  id: string;
  title: string;
  creator: {
    name: string;
    avatarUrl?: string;
    verified?: boolean;
  };
  category: "Artwork" | "Video" | "Motion" | "Illustration" | "Poster";
  coverUrl: string;
  likes: number;
  comments: number;
  views?: number;
  badge?: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  creator: {
    name: string;
    role?: string;
    avatarUrl: string;
    followers?: string;
    isFollowing?: boolean;
  };
  track: {
    id: string;
    title: string;
    artist: string;
  };
  mainImage: string;
  subPreviews: string[];
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  processSteps: ProcessStep[];
  toolTags?: string[];
  publishedDate?: string;
}

export interface Project {
  id: string;
  title: string;
  creator: {
    name: string;
    avatarUrl?: string;
    verified?: boolean;
  };
  category: "Graphic Design" | "Music Video" | "Album Artwork" | "Motion Graphics" | "Illustration";
  coverUrl: string;
  likes: number;
  views: number;
  badge?: string;
}

export interface MoodItem {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  imageUrl: string;
  trackCount: number;
  tag: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatarUrl: string;
  worksCount: number;
  followers: string;
  isFollowing?: boolean;
}

export interface CreatorWork {
  id: string;
  title: string;
  trackTitle: string;
  coverUrl: string;
  likes: number;
  views: number;
  category: string;
}

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatarUrl: string;
  coverUrl?: string;
  bio: string;
  stats: {
    projects: number;
    followers: string;
    openCalls: number;
  };
  tools: {
    name: string;
    short: string;
    color: string;
  }[];
  recentWorks: CreatorWork[];
  contactEmail?: string;
  instagram?: string;
  behance?: string;
  isFollowing?: boolean;
}

export interface OpenCall {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  dDay: string;
  tags: string[];
  coverUrl: string;
  organizer: string;
  prize?: string;
}

export type CommunityCategory = "전체" | "감상 노트" | "피드백 & 질문" | "프로젝트 모집" | "자유 게시판";

export interface CommunityPost {
  id: string;
  category: CommunityCategory;
  author: {
    name: string;
    avatarUrl: string;
    role?: string;
    verified?: boolean;
  };
  timeAgo: string;
  title: string;
  content: string;
  tags: string[];
  thumbnailUrl?: string;
  likes: number;
  comments: number;
  views?: number;
}

export type MarketCategory = "전체" | "텍스처/브러시" | "템플릿" | "3D";

export interface MarketAsset {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  category: MarketCategory;
  coverUrl: string;
  likes: number;
  creatorName?: string;
  fileFormat?: string;
  badge?: string;
}
