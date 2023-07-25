create table events (
  id uuid not null primary key default uuid_generate_v4(),
  created_at timestamp with time zone not null default now(),
  payload jsonb not null
);