-- Add the new 'name' column with a default value
ALTER TABLE orders ADD COLUMN name TEXT NOT NULL DEFAULT 'Unknown';

-- Add the new 'consent_to_email_marketing' column
ALTER TABLE orders ADD COLUMN consent_to_email_marketing BOOLEAN DEFAULT FALSE;