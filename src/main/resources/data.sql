--This is sample data to have populated tables. 

-- Disable foreign key checks for a smooth import process
SET session_replication_role = 'replica';

-- Users Table
-- Creating users first as they are referenced by other tables
INSERT INTO users (user_id, username, email, password_hash, first_name, last_name, created_at, updated_at) VALUES
(uuid_generate_v4(), 'jdoe', 'jdoe@example.com', 'hashed_password_123', 'John', 'Doe', NOW(), NOW()),
(uuid_generate_v4(), 'asmith', 'asmith@example.com', 'hashed_password_456', 'Alice', 'Smith', NOW(), NOW()),
(uuid_generate_v4(), 'bmiller', 'bmiller@example.com', 'hashed_password_789', 'Bob', 'Miller', NOW(), NOW());

-- Accounts Table
-- Using subqueries to link to user IDs
INSERT INTO accounts (account_id, account_name, industry, website, phone, owner_id, created_at, updated_at, metadata) VALUES
(uuid_generate_v4(), 'TechCorp Solutions', 'Technology', 'techcorpsolutions.com', '555-123-4567', (SELECT user_id FROM users WHERE username = 'jdoe'), NOW(), NOW(), '{"tier": "Platinum", "notes": "High-value client"}'),
(uuid_generate_v4(), 'Global Innovate Inc.', 'Manufacturing', 'globalinnovate.com', '555-987-6543', (SELECT user_id FROM users WHERE username = 'asmith'), NOW(), NOW(), '{"tier": "Gold", "notes": "Potential for growth"}'),
(uuid_generate_v4(), 'HealthCare Partners', 'Healthcare', 'healthcarepartners.com', '555-555-1212', (SELECT user_id FROM users WHERE username = 'jdoe'), NOW(), NOW(), '{"tier": "Silver", "notes": "Needs nurturing"}'),
(uuid_generate_v4(), 'Innovate Dynamics', 'Technology', 'innovatedynamics.com', '555-444-3333', (SELECT user_id FROM users WHERE username = 'bmiller'), NOW(), NOW(), '{"tier": "Bronze"}');

-- Products Table
-- Data for products that can be added to opportunities
INSERT INTO products (product_id, product_name, sku, price, description, created_at, updated_at) VALUES
(uuid_generate_v4(), 'CRM-Pro Software', 'CRM-PRO-SKU', 50000.00, 'Advanced CRM solution for enterprise businesses.', NOW(), NOW()),
(uuid_generate_v4(), 'Data Analytics Module', 'DATA-ANALYTICS-MOD', 15000.00, 'Module for advanced data reporting and analysis.', NOW(), NOW()),
(uuid_generate_v4(), 'Onboarding & Training', 'ONBOARD-TRAIN', 5000.00, 'Implementation and user training services.', NOW(), NOW());

-- Campaigns Table
-- Sample marketing campaigns
INSERT INTO campaigns (campaign_id, campaign_name, campaign_type, start_date, end_date, status, owner_id, created_at, updated_at) VALUES
(uuid_generate_v4(), 'Q3 Lead Generation', 'Email Marketing', NOW(), NOW(), 'active', (SELECT user_id FROM users WHERE username = 'asmith'), NOW(), NOW()),
(uuid_generate_v4(), 'Trade Show Follow-up', 'Event', NOW(), NOW(), 'draft', (SELECT user_id FROM users WHERE username = 'bmiller'), NOW(), NOW());

-- Contacts Table
-- Linking contacts to accounts and users
INSERT INTO contacts (contact_id, first_name, last_name, email, phone, job_title, account_id, owner_id, is_lead, created_at, updated_at, metadata) VALUES
(uuid_generate_v4(), 'Sarah', 'Johnson', 'sjohnson@techcorp.com', '555-111-2222', 'CTO', (SELECT account_id FROM accounts WHERE account_name = 'TechCorp Solutions'), (SELECT user_id FROM users WHERE username = 'jdoe'), FALSE, NOW(), NOW(), '{"source": "website"}'),
(uuid_generate_v4(), 'Michael', 'Chen', 'mchen@globalinnovate.com', '555-333-4444', 'Procurement Manager', (SELECT account_id FROM accounts WHERE account_name = 'Global Innovate Inc.'), (SELECT user_id FROM users WHERE username = 'asmith'), FALSE, NOW(), NOW(), '{"source": "referral"}'),
(uuid_generate_v4(), 'Emily', 'Davis', 'edavis@example.com', '555-666-7777', 'IT Director', NULL, (SELECT user_id FROM users WHERE username = 'bmiller'), TRUE, NOW(), NOW(), '{"source": "trade_show"}'),
(uuid_generate_v4(), 'David', 'Wilson', 'dwilson@innovatedynamics.com', '555-888-9999', 'CEO', (SELECT account_id FROM accounts WHERE account_name = 'Innovate Dynamics'), (SELECT user_id FROM users WHERE username = 'bmiller'), FALSE, NOW(), NOW(), '{"source": "cold_call"}');

-- Opportunities Table
-- Linking opportunities to accounts, contacts, and users
INSERT INTO opportunities (opportunity_id, opportunity_name, account_id, contact_id, owner_id, amount, stage, close_date, created_at, updated_at) VALUES
(uuid_generate_v4(), 'TechCorp IT Infrastructure Upgrade', (SELECT account_id FROM accounts WHERE account_name = 'TechCorp Solutions'), (SELECT contact_id FROM contacts WHERE email = 'sjohnson@techcorp.com'), (SELECT user_id FROM users WHERE username = 'jdoe'), 150000.00, 'negotiation', NOW(), NOW(), NOW()),
(uuid_generate_v4(), 'Global Innovate New Production Line', (SELECT account_id FROM accounts WHERE account_name = 'Global Innovate Inc.'), (SELECT contact_id FROM contacts WHERE email = 'mchen@globalinnovate.com'), (SELECT user_id FROM users WHERE username = 'asmith'), 500000.00, 'qualification', NOW(), NOW(), NOW()),
(uuid_generate_v4(), 'Innovate Dynamics Software Deal', (SELECT account_id FROM accounts WHERE account_name = 'Innovate Dynamics'), (SELECT contact_id FROM contacts WHERE email = 'dwilson@innovatedynamics.com'), (SELECT user_id FROM users WHERE username = 'bmiller'), 75000.00, 'prospecting', NOW(), NOW(), NOW());

-- Activities Table
-- Linking activities to users
INSERT INTO activities (activity_id, activity_type, subject, due_date, status, owner_id, created_at, updated_at) VALUES
(uuid_generate_v4(), 'call', 'Follow-up with Sarah Johnson', NOW(), 'planned', (SELECT user_id FROM users WHERE username = 'jdoe'), NOW(), NOW()),
(uuid_generate_v4(), 'email', 'Send proposal to Michael Chen', NOW(), 'in_progress', (SELECT user_id FROM users WHERE username = 'asmith'), NOW(), NOW()),
(uuid_generate_v4(), 'meeting', 'Demo for Innovate Dynamics', NOW(), 'planned', (SELECT user_id FROM users WHERE username = 'bmiller'), NOW(), NOW());

-- Activity_Relations Table
-- Linking activities to related entities
INSERT INTO activity_relations (activity_id, account_id, contact_id, opportunity_id) VALUES
((SELECT activity_id FROM activities WHERE subject = 'Follow-up with Sarah Johnson'), (SELECT account_id FROM accounts WHERE account_name = 'TechCorp Solutions'), (SELECT contact_id FROM contacts WHERE email = 'sjohnson@techcorp.com'), NULL),
((SELECT activity_id FROM activities WHERE subject = 'Send proposal to Michael Chen'), (SELECT account_id FROM accounts WHERE account_name = 'Global Innovate Inc.'), (SELECT contact_id FROM contacts WHERE email = 'mchen@globalinnovate.com'), (SELECT opportunity_id FROM opportunities WHERE opportunity_name = 'Global Innovate New Production Line'));

-- Memos Table
-- Storing notes for different entities
INSERT INTO memos (memo_id, related_to_type, related_to_id, user_id, memo_text, created_at) VALUES
(uuid_generate_v4(), 'account', (SELECT account_id FROM accounts WHERE account_name = 'TechCorp Solutions'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'Discussed upcoming project needs. Client is interested in new AI solutions.', NOW()),
(uuid_generate_v4(), 'contact', (SELECT contact_id FROM contacts WHERE email = 'edavis@example.com'), (SELECT user_id FROM users WHERE username = 'bmiller'), 'Initial contact made. Emily is a key decision-maker for IT procurement.', NOW());

-- Campaign_Leads Table
-- Linking leads to campaigns
INSERT INTO campaign_leads (campaign_id, contact_id, status, created_at) VALUES
((SELECT campaign_id FROM campaigns WHERE campaign_name = 'Q3 Lead Generation'), (SELECT contact_id FROM contacts WHERE email = 'edavis@example.com'), 'sent', NOW());

-- Opportunity_Products Table
-- Linking products to opportunities
INSERT INTO opportunity_products (opportunity_id, product_id, quantity, price) VALUES
((SELECT opportunity_id FROM opportunities WHERE opportunity_name = 'TechCorp IT Infrastructure Upgrade'), (SELECT product_id FROM products WHERE product_name = 'CRM-Pro Software'), 1, 50000.00),
((SELECT opportunity_id FROM opportunities WHERE opportunity_name = 'TechCorp IT Infrastructure Upgrade'), (SELECT product_id FROM products WHERE product_name = 'Onboarding & Training'), 1, 5000.00);

-- Re-enable foreign key checks
SET session_replication_role = 'origin';