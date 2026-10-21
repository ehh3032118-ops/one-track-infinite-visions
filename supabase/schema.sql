-- One Track, Infinite Visions: Community Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create Posts Table
create table if not exists public.posts (
  id text primary key,
  category text not null default '피드백 & 질문',
  author_name text not null,
  author_avatar text not null,
  author_role text,
  author_verified boolean default false,
  title text not null,
  content text not null,
  tags text[] default array[]::text[],
  thumbnail_url text,
  likes integer default 0,
  comments_count integer default 0,
  views integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Comments Table
create table if not exists public.comments (
  id text primary key,
  post_id text references public.posts(id) on delete cascade not null,
  author_name text not null default '익명 크리에이터',
  author_avatar text,
  author_role text default 'Visual Explorer',
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Indexes for High Performance
create index if not exists idx_posts_created_at on public.posts (created_at desc);
create index if not exists idx_posts_category on public.posts (category);
create index if not exists idx_comments_post_id on public.comments (post_id);
create index if not exists idx_comments_created_at on public.comments (created_at asc);

-- 4. Enable Row Level Security (RLS)
alter table public.posts enable row level security;
alter table public.comments enable row level security;

-- 5. Create Public Access Policies (Allow Everyone to Read and Write)
create policy "Allow public read posts" on public.posts
  for select using (true);

create policy "Allow public insert posts" on public.posts
  for insert with check (true);

create policy "Allow public update posts" on public.posts
  for update using (true);

create policy "Allow public read comments" on public.comments
  for select using (true);

create policy "Allow public insert comments" on public.comments
  for insert with check (true);

-- 6. RPC Function to increment likes safely
create or replace function public.increment_likes(post_id text)
returns void as $$
begin
  update public.posts
  set likes = likes + 1
  where id = post_id;
end;
$$ language plpgsql security definer;

-- 7. Trigger to automatically increment comments_count when comment inserted
create or replace function public.handle_new_comment()
returns trigger as $$
begin
  update public.posts
  set comments_count = comments_count + 1
  where id = new.post_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_comment_created on public.comments;
create trigger on_comment_created
  after insert on public.comments
  for each row execute procedure public.handle_new_comment();

-- 8. Enable Realtime Publications
alter publication supabase_realtime add table public.posts;
alter publication supabase_realtime add table public.comments;
