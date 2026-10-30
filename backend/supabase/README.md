# NIRBHAYANET Backend

## Project Overview
NIRBHAYANET is a community-powered women's safety ecosystem.

## Backend
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth
- Security: Row Level Security (RLS)
- Tables: 14
- RLS Policies: 24

## Important Security Notes
- Users can access their own records according to RLS policies.
- SOS location sharing requires user consent.
- Volunteer approval must remain admin-controlled.
- Never commit secret API keys or passwords.
