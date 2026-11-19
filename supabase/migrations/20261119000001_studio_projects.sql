-- NEOPAD STUDIO project portfolio management
-- Additive migration: preserves all existing tables, policies and records.

begin;

create table if not exists public.studio_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 160),
  client_name text not null check (char_length(trim(client_name)) between 2 and 160),
  category text not null check (char_length(trim(category)) between 2 and 80),
  description text,
  status text not null default 'planning'
    check (status in ('planning', 'in_progress', 'completed', 'on_hold')),
  start_date date,
  completion_date date,
  project_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint studio_projects_completion_date_check
    check (completion_date is null or start_date is null or completion_date >= start_date),
  constraint studio_projects_url_check
    check (project_url is null or project_url ~* '^https?://')
);

create index if not exists idx_studio_projects_status on public.studio_projects(status);
create index if not exists idx_studio_projects_created_at on public.studio_projects(created_at desc);
create index if not exists idx_studio_projects_completion_date on public.studio_projects(completion_date desc);

alter table public.studio_projects enable row level security;

drop trigger if exists trg_studio_projects_updated_at on public.studio_projects;
create trigger trg_studio_projects_updated_at
  before update on public.studio_projects
  for each row execute function public.set_updated_at();

drop policy if exists "studio_projects_admin_all" on public.studio_projects;
create policy "studio_projects_admin_all"
  on public.studio_projects
  for all
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

grant select, insert, update, delete on public.studio_projects to authenticated;

commit;
notify pgrst, 'reload schema';
