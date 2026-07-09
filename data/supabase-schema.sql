create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'viewer' check (role in ('admin','editor','viewer')),
  full_name text,
  avatar_url text,
  updated_at timestamptz default now()
);

create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text,
  type text,
  client_name text,
  industry text,
  thumbnail text not null,
  banner text,
  video_url text,
  image_url text,
  gallery text,
  software text,
  services_used text,
  tags text,
  description text,
  challenge text,
  solution text,
  creative_process text,
  behind_the_scenes text,
  results text,
  testimonial text,
  seo_title text,
  seo_description text,
  featured boolean default false,
  status text default 'published' check (status in ('published','draft','archived','trash')),
  published boolean generated always as (status = 'published') stored,
  publish_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists media_library (
  id uuid primary key default gen_random_uuid(),
  title text,
  type text,
  folder text,
  url text not null,
  cloudinary_public_id text,
  status text default 'published',
  created_at timestamptz default now()
);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  body text,
  featured_image text,
  categories text,
  tags text,
  seo_title text,
  seo_description text,
  status text default 'draft',
  publish_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists client_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text,
  company text,
  photo_url text,
  logo_url text,
  rating int default 5,
  review text,
  featured boolean default false,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text,
  status text default 'new',
  notes text,
  source text default 'website',
  created_at timestamptz default now()
);

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists version_history (
  id uuid primary key default gen_random_uuid(),
  entity_type text,
  entity_id uuid,
  snapshot jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table portfolio enable row level security;
alter table media_library enable row level security;
alter table blogs enable row level security;
alter table client_reviews enable row level security;
alter table leads enable row level security;
alter table site_settings enable row level security;
alter table version_history enable row level security;

create policy "Public can read published portfolio" on portfolio for select using (status = 'published' and publish_at <= now());
create policy "Public can read reviews" on client_reviews for select using (published = true);
create policy "Public can create leads" on leads for insert with check (true);
create policy "Authenticated editors manage CMS" on portfolio for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users manage media" on media_library for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users manage blogs" on blogs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users manage settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
