-- NIRBHAYANET: Row Level Security policies
-- Apply only after the corresponding tables exist.

-- Enable RLS on all 14 project tables
ALTER TABLE public.nn_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_help_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_journey_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_trusted_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_safety_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_safe_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nn_audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile"
ON public.nn_profiles FOR SELECT TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can create own profile"
ON public.nn_profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.nn_profiles FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Organisations
CREATE POLICY "View approved organisations"
ON public.nn_organisations FOR SELECT TO anon, authenticated
USING (verification_status = 'approved');

-- Volunteer applications
CREATE POLICY "Applicants submit own application"
ON public.nn_volunteer_applications FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND adult_eligibility_confirmed = true
);

CREATE POLICY "Applicants view own application"
ON public.nn_volunteer_applications FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Help requests
CREATE POLICY "Users submit own help requests"
ON public.nn_help_requests FOR INSERT TO authenticated
WITH CHECK (auth.uid() = requester_id AND status = 'open');

CREATE POLICY "Users view own help requests"
ON public.nn_help_requests FOR SELECT TO authenticated
USING (auth.uid() = requester_id);

-- Verification records
CREATE POLICY "Users can submit own verification records"
ON public.nn_verification_records FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND status = 'pending'
  AND reviewed_by IS NULL
  AND reviewed_at IS NULL
);

CREATE POLICY "Users can view own verification records"
ON public.nn_verification_records FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Help matches
CREATE POLICY "Users can view their own help matches"
ON public.nn_help_matches FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.nn_help_requests h
    WHERE h.id = nn_help_matches.help_request_id
      AND h.requester_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM public.nn_volunteer_applications v
    WHERE v.id = nn_help_matches.volunteer_application_id
      AND v.user_id = auth.uid()
  )
);

-- SOS alerts
CREATE POLICY "Users can create own SOS alerts"
ON public.nn_sos_alerts FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (
    location_sharing_consent = true
    OR (latitude IS NULL AND longitude IS NULL)
  )
);

CREATE POLICY "Users can view their own SOS alerts"
ON public.nn_sos_alerts FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Journeys
CREATE POLICY "Users can create own journeys"
ON public.nn_journeys FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own journeys"
ON public.nn_journeys FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own journeys"
ON public.nn_journeys FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Journey check-ins
CREATE POLICY "Users can create own journey checkins"
ON public.nn_journey_checkins FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own journey checkins"
ON public.nn_journey_checkins FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Trusted contacts
CREATE POLICY "Users can create own trusted contacts"
ON public.nn_trusted_contacts FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own trusted contacts"
ON public.nn_trusted_contacts FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Safety reports
CREATE POLICY "Users can submit own safety reports"
ON public.nn_safety_reports FOR INSERT TO authenticated
WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own safety reports"
ON public.nn_safety_reports FOR SELECT TO authenticated
USING (auth.uid() = reporter_id);

-- Safe places
CREATE POLICY "Public can view verified safe places"
ON public.nn_safe_places FOR SELECT TO public
USING (verification_status = 'verified');

-- Rewards
CREATE POLICY "Users can view on rewards"
ON public.nn_rewards FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Audit logs: RLS enabled; no user-facing policies.
