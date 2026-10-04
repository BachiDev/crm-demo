-- V2: demo dataset. Same content as CrmDataLoader (local profile fallback), but as
-- versioned SQL with fixed UUIDs so every fresh database (local, CI, new Neon
-- branch) starts with an identical, presentable demo. Fully idempotent
-- (ON CONFLICT DO NOTHING) so re-runs and baselined databases are safe.

INSERT INTO public.users (user_id, username, email, password_hash, first_name, last_name, date_created, last_updated)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'jdoe', 'jdoe@example.com', 'hashed_password_123', 'John', 'Doe', now(), now()),
    ('22222222-2222-2222-2222-222222222222', 'asmith', 'asmith@example.com', 'hashed_password_456', 'Alice', 'Smith', now(), now()),
    ('33333333-3333-3333-3333-333333333333', 'bmiller', 'bmiller@example.com', 'hashed_password_789', 'Bob', 'Miller', now(), now())
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.products (product_id, product_name, sku, price, description, date_created, last_updated)
VALUES
    ('21111111-1111-1111-1111-111111111111', 'CRM-Pro Software', 'CRM-PRO-SKU', 50000.00, 'Advanced CRM solution for enterprise businesses.', now(), now()),
    ('22222222-2222-2222-2222-222222222222', 'Data Analytics Module', 'DATA-ANALYTICS-MOD', 15000.00, 'Module for advanced data reporting and analysis.', now(), now())
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO public.accounts (account_id, account_name, industry, website, phone, owner_id, date_created, last_updated)
VALUES
    ('31111111-1111-1111-1111-111111111111', 'TechCorp Solutions', 'Technology', 'techcorpsolutions.com', '555-123-4567', '11111111-1111-1111-1111-111111111111', now(), now()),
    ('32222222-2222-2222-2222-222222222222', 'Global Innovate Inc.', 'Manufacturing', 'globalinnovate.com', '555-987-6543', '22222222-2222-2222-2222-222222222222', now(), now())
ON CONFLICT (account_id) DO NOTHING;

INSERT INTO public.campaigns (campaign_id, campaign_name, campaign_type, status, owner_id, date_created, last_updated)
VALUES
    ('41111111-1111-1111-1111-111111111111', 'Q3 Lead Generation', 'Email Marketing', 'active', '22222222-2222-2222-2222-222222222222', now(), now())
ON CONFLICT (campaign_id) DO NOTHING;

INSERT INTO public.contacts (contact_id, first_name, last_name, email, job_title, owner_id, account_id, is_lead, date_created, last_updated)
VALUES
    ('51111111-1111-1111-1111-111111111111', 'Sarah', 'Johnson', 'sjohnson@techcorp.com', 'CTO', '11111111-1111-1111-1111-111111111111', '31111111-1111-1111-1111-111111111111', false, now(), now()),
    ('52222222-2222-2222-2222-222222222222', 'Michael', 'Chen', 'mchen@globalinnovate.com', 'Procurement Manager', '22222222-2222-2222-2222-222222222222', '32222222-2222-2222-2222-222222222222', false, now(), now()),
    ('53333333-3333-3333-3333-333333333333', 'Emily', 'Davis', 'edavis@example.com', 'IT Director', '33333333-3333-3333-3333-333333333333', NULL, true, now(), now())
ON CONFLICT (contact_id) DO NOTHING;

INSERT INTO public.opportunities (opportunity_id, opportunity_name, owner_id, account_id, contact_id, amount, stage, date_created, last_updated)
VALUES
    ('61111111-1111-1111-1111-111111111111', 'TechCorp IT Infrastructure Upgrade', '11111111-1111-1111-1111-111111111111', '31111111-1111-1111-1111-111111111111', '51111111-1111-1111-1111-111111111111', 150000.00, 'negotiation', now(), now())
ON CONFLICT (opportunity_id) DO NOTHING;

INSERT INTO public.activities (activity_id, activity_type, subject, owner_id, status, date_created, last_updated)
VALUES
    ('71111111-1111-1111-1111-111111111111', 'call', 'Follow-up call with Sarah Johnson', '11111111-1111-1111-1111-111111111111', 'planned', now(), now()),
    ('72222222-2222-2222-2222-222222222222', 'email', 'Send proposal to Michael Chen', '22222222-2222-2222-2222-222222222222', 'in_progress', now(), now())
ON CONFLICT (activity_id) DO NOTHING;

INSERT INTO public.memoes (memo_id, related_to_type, related_to_id, user_id, memo_text, date_created, last_updated)
VALUES
    ('81111111-1111-1111-1111-111111111111', 'account', '31111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Discussed upcoming project needs. Client is interested in new AI solutions.', now(), now()),
    ('82222222-2222-2222-2222-222222222222', 'contact', '53333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Initial contact made. Emily is a key decision-maker for IT procurement.', now(), now())
ON CONFLICT (memo_id) DO NOTHING;

INSERT INTO public.activity_relations (id, activity_id, account_id, contact_id, opportunity_id, date_created, last_updated)
VALUES
    (10001, '71111111-1111-1111-1111-111111111111', '31111111-1111-1111-1111-111111111111', '51111111-1111-1111-1111-111111111111', NULL, now(), now()),
    (10002, '72222222-2222-2222-2222-222222222222', '32222222-2222-2222-2222-222222222222', '52222222-2222-2222-2222-222222222222', NULL, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Keep the sequence ahead of the seeded relation ids (idempotent).
SELECT setval('public.primary_sequence', GREATEST((SELECT max(id) FROM public.activity_relations), 10002));
