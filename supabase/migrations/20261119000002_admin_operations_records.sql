-- NEOPAD Digital: operational records for finance, meetings, client feedback and activity.
-- Additive only. Existing tables, rows, authentication and policies are preserved.

begin;

alter table public.studio_projects
  add column if not exists progress_percent integer not null default 0
    check (progress_percent between 0 and 100),
  add column if not exists deadline date;

create table if not exists public.studio_financial_entries (
  id uuid primary key default gen_random_uuid(),
  entry_type text not null check (entry_type in ('income', 'expense')),
  description text not null check (char_length(trim(description)) between 2 and 240),
  category text not null check (char_length(trim(category)) between 2 and 80),
  amount numeric(14,2) not null check (amount > 0),
  currency text not null default 'MWK' check (currency ~ '^[A-Z]{3}$'),
  recorded_on date not null default current_date,
  project_id uuid references public.studio_projects(id) on delete set null,
  reference text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_studio_financial_entries_recorded
  on public.studio_financial_entries(recorded_on desc);
create index if not exists idx_studio_financial_entries_type_recorded
  on public.studio_financial_entries(entry_type, recorded_on desc);

create table if not exists public.studio_meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 2 and 180),
  meeting_type text not null default 'client' check (meeting_type in ('client', 'internal')),
  attendee_name text,
  attendee_email text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  meeting_url text,
  notes text,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint studio_meetings_time_check check (ends_at is null or ends_at > starts_at),
  constraint studio_meetings_url_check check (meeting_url is null or meeting_url ~* '^https?://')
);

create index if not exists idx_studio_meetings_starts_at on public.studio_meetings(starts_at);

create table if not exists public.studio_client_feedback (
  id uuid primary key default gen_random_uuid(),
  client_name text not null check (char_length(trim(client_name)) between 2 and 160),
  client_email text,
  rating integer not null check (rating between 1 and 5),
  feedback text,
  project_id uuid references public.studio_projects(id) on delete set null,
  received_on date not null default current_date,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_studio_client_feedback_received
  on public.studio_client_feedback(received_on desc);

create table if not exists public.studio_activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  actor_name text,
  action text not null check (char_length(trim(action)) between 2 and 180),
  entity_type text not null check (char_length(trim(entity_type)) between 2 and 60),
  entity_id uuid,
  details text,
  created_at timestamptz not null default now()
);

create index if not exists idx_studio_activity_log_created
  on public.studio_activity_log(created_at desc);

alter table public.studio_financial_entries enable row level security;
alter table public.studio_meetings enable row level security;
alter table public.studio_client_feedback enable row level security;
alter table public.studio_activity_log enable row level security;

drop policy if exists "studio_financial_entries_admin_all" on public.studio_financial_entries;
create policy "studio_financial_entries_admin_all" on public.studio_financial_entries
  for all to authenticated using (public.is_studio_admin()) with check (public.is_studio_admin());

drop policy if exists "studio_meetings_admin_all" on public.studio_meetings;
create policy "studio_meetings_admin_all" on public.studio_meetings
  for all to authenticated using (public.is_studio_admin()) with check (public.is_studio_admin());

drop policy if exists "studio_client_feedback_admin_all" on public.studio_client_feedback;
create policy "studio_client_feedback_admin_all" on public.studio_client_feedback
  for all to authenticated using (public.is_studio_admin()) with check (public.is_studio_admin());

drop policy if exists "studio_activity_log_admin_read" on public.studio_activity_log;
create policy "studio_activity_log_admin_read" on public.studio_activity_log
  for select to authenticated using (public.is_studio_admin());

drop policy if exists "studio_activity_log_admin_insert" on public.studio_activity_log;
create policy "studio_activity_log_admin_insert" on public.studio_activity_log
  for insert to authenticated with check (public.is_studio_admin());

grant select, insert, update, delete on public.studio_financial_entries,
  public.studio_meetings, public.studio_client_feedback to authenticated;
grant select, insert on public.studio_activity_log to authenticated;

commit;
notify pgrst, 'reload schema';
