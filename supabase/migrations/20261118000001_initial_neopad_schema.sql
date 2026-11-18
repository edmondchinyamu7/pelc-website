-- ============================================================================
-- NEOPAD STUDIO - Initial Supabase Schema & RLS Migration
-- Project Ref: frsavqbtvrjqdsrbngwd (Europe / Frankfurt)
-- Notes:
--   - Compatible with @supabase/ssr auth flow (/auth/*, /account) and API routes
--   - Covers profiles, inquiries, consultations, event_rsvps, and private
--     project-briefs storage bucket
--   - Idempotent & non-destructive (no DROP TABLE, TRUNCATE, or seed data)
-- ============================================================================

begin;

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. Shared Trigger Functions
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- 2. Profiles (1:1 with auth.users)
-- ----------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  company_name text,
  phone text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;

create or replace function public.is_studio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    -- Allow changes only from privileged server/SQL roles or existing studio admins
    if auth.uid() is not null and not public.is_studio_admin() then
      raise exception 'Only studio administrators may change user roles.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

drop trigger if exists trg_profiles_prevent_role_escalation on public.profiles;
create trigger trg_profiles_prevent_role_escalation
  before update on public.profiles
  for each row
  execute function public.prevent_profile_role_escalation();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), '')
  )
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Backfill profile rows for any users already present in auth.users (safe no-op if empty)
insert into public.profiles (id, email, full_name)
select
  u.id,
  u.email,
  nullif(trim(coalesce(u.raw_user_meta_data ->> 'full_name', '')), '')
from auth.users u
on conflict (id) do nothing;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id or public.is_studio_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id and role = 'client');

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id or public.is_studio_admin())
  with check (auth.uid() = id or public.is_studio_admin());

-- ----------------------------------------------------------------------------
-- 3. Contact & Department Inquiries (/contact, /wdd, /sdd, /ud, /ad, /md, /cpd)
-- ----------------------------------------------------------------------------

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  department text not null default 'general'
    check (department in ('general', 'wdd', 'sdd', 'ud', 'ad', 'md', 'cpd')),
  project_type text,
  name text not null check (char_length(trim(name)) > 0),
  email text not null check (char_length(trim(email)) > 0),
  phone text,
  subject text,
  message text not null check (char_length(trim(message)) > 0),
  status text not null default 'new'
    check (status in ('new', 'in_review', 'replied', 'archived')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_inquiries_user_id on public.inquiries (user_id);
create index if not exists idx_inquiries_department_status on public.inquiries (department, status);
create index if not exists idx_inquiries_created_at on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;

drop trigger if exists trg_inquiries_updated_at on public.inquiries;
create trigger trg_inquiries_updated_at
  before update on public.inquiries
  for each row
  execute function public.set_updated_at();

drop policy if exists "inquiries_insert_public" on public.inquiries;
create policy "inquiries_insert_public"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (
    (user_id is null or auth.uid() = user_id)
    and status = 'new'
  );

drop policy if exists "inquiries_select_own_or_admin" on public.inquiries;
create policy "inquiries_select_own_or_admin"
  on public.inquiries
  for select
  to authenticated
  using (auth.uid() = user_id or public.is_studio_admin());

drop policy if exists "inquiries_update_admin" on public.inquiries;
create policy "inquiries_update_admin"
  on public.inquiries
  for update
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

drop policy if exists "inquiries_delete_admin" on public.inquiries;
create policy "inquiries_delete_admin"
  on public.inquiries
  for delete
  to authenticated
  using (public.is_studio_admin());

-- ----------------------------------------------------------------------------
-- 4. Consultation Bookings (/consultation)
-- ----------------------------------------------------------------------------

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  service text not null check (
    service in (
      'website',
      'software',
      'design',
      'advertising',
      'marketing',
      'creative',
      'ai',
      'comprehensive'
    )
  ),
  project_description text not null check (char_length(trim(project_description)) > 0),
  audience text not null default 'businesses',
  timeline text not null default '1-3-months',
  budget text not null default '500-1500',
  additional_notes text,
  name text not null check (char_length(trim(name)) > 0),
  email text not null check (char_length(trim(email)) > 0),
  phone text,
  status text not null default 'pending'
    check (status in ('pending', 'scheduled', 'completed', 'cancelled')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_consultations_user_id on public.consultations (user_id);
create index if not exists idx_consultations_status_created on public.consultations (status, created_at desc);

alter table public.consultations enable row level security;

drop trigger if exists trg_consultations_updated_at on public.consultations;
create trigger trg_consultations_updated_at
  before update on public.consultations
  for each row
  execute function public.set_updated_at();

drop policy if exists "consultations_insert_public" on public.consultations;
create policy "consultations_insert_public"
  on public.consultations
  for insert
  to anon, authenticated
  with check (
    (user_id is null or auth.uid() = user_id)
    and status = 'pending'
  );

drop policy if exists "consultations_select_own_or_admin" on public.consultations;
create policy "consultations_select_own_or_admin"
  on public.consultations
  for select
  to authenticated
  using (auth.uid() = user_id or public.is_studio_admin());

drop policy if exists "consultations_update_admin" on public.consultations;
create policy "consultations_update_admin"
  on public.consultations
  for update
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

drop policy if exists "consultations_delete_admin" on public.consultations;
create policy "consultations_delete_admin"
  on public.consultations
  for delete
  to authenticated
  using (public.is_studio_admin());

-- ----------------------------------------------------------------------------
-- 5. Event RSVPs (/event)
-- ----------------------------------------------------------------------------

create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  event_number text not null,
  event_title text not null check (char_length(trim(event_title)) > 0),
  attendee_name text not null check (char_length(trim(attendee_name)) > 0),
  attendee_email text not null check (char_length(trim(attendee_email)) > 0),
  status text not null default 'registered'
    check (status in ('registered', 'attended', 'cancelled')),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_event_rsvps_user_id on public.event_rsvps (user_id);
create index if not exists idx_event_rsvps_event_number on public.event_rsvps (event_number, created_at desc);

alter table public.event_rsvps enable row level security;

drop policy if exists "event_rsvps_insert_public" on public.event_rsvps;
create policy "event_rsvps_insert_public"
  on public.event_rsvps
  for insert
  to anon, authenticated
  with check (
    (user_id is null or auth.uid() = user_id)
    and status = 'registered'
  );

drop policy if exists "event_rsvps_select_own_or_admin" on public.event_rsvps;
create policy "event_rsvps_select_own_or_admin"
  on public.event_rsvps
  for select
  to authenticated
  using (auth.uid() = user_id or public.is_studio_admin());

drop policy if exists "event_rsvps_update_admin" on public.event_rsvps;
create policy "event_rsvps_update_admin"
  on public.event_rsvps
  for update
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

drop policy if exists "event_rsvps_delete_admin" on public.event_rsvps;
create policy "event_rsvps_delete_admin"
  on public.event_rsvps
  for delete
  to authenticated
  using (public.is_studio_admin());

-- ----------------------------------------------------------------------------
-- 6. Explicit Table Privileges (enforced alongside RLS)
-- ----------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.profiles, public.inquiries, public.consultations, public.event_rsvps to authenticated;
grant insert on public.inquiries, public.consultations, public.event_rsvps to anon;

-- ----------------------------------------------------------------------------
-- 7. Storage Bucket for Client Project Briefs (Private)
-- ----------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-briefs',
  'project-briefs',
  false,
  10485760,
  array['application/pdf', 'image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set
  name = excluded.name,
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "project_briefs_insert_own" on storage.objects;
create policy "project_briefs_insert_own"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'project-briefs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "project_briefs_select_own_or_admin" on storage.objects;
create policy "project_briefs_select_own_or_admin"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'project-briefs'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_studio_admin()
    )
  );

drop policy if exists "project_briefs_update_own_or_admin" on storage.objects;
create policy "project_briefs_update_own_or_admin"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'project-briefs'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_studio_admin()
    )
  )
  with check (
    bucket_id = 'project-briefs'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_studio_admin()
    )
  );

drop policy if exists "project_briefs_delete_own_or_admin" on storage.objects;
create policy "project_briefs_delete_own_or_admin"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'project-briefs'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_studio_admin()
    )
  );

commit;

-- Refresh PostgREST schema cache immediately so API routes see the new tables
notify pgrst, 'reload schema';
