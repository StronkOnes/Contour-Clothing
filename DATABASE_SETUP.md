# Database Setup Instructions

## Updating the Orders Table Schema

To implement the new features (customer name and email marketing consent), you need to update your Supabase database schema.

### Option 1: Recreate the Table (Data Loss Warning!)
If you don't have important existing data, you can recreate the table using the new schema:

```sql
-- Drop the existing table (THIS WILL DELETE ALL EXISTING DATA!)
DROP TABLE IF EXISTS orders;

-- Create the new table with updated schema
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount REAL NOT NULL,
  consent_to_email_marketing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Option 2: Modify Existing Table (Preserves Data) - RECOMMENDED
If you want to preserve existing data, run this ALTER statement:

```sql
-- Add the new 'name' column with a default value
ALTER TABLE orders ADD COLUMN name TEXT NOT NULL DEFAULT 'Unknown';

-- Add the new 'consent_to_email_marketing' column
ALTER TABLE orders ADD COLUMN consent_to_email_marketing BOOLEAN DEFAULT FALSE;
```

### How to Execute the SQL Script

1. Go to your Supabase dashboard at https://supabase.com/dashboard
2. Navigate to your project (the one with URL: https://ggetdjfcvmnesntwqmqr.supabase.co)
3. Click on "SQL Editor" in the left sidebar
4. Copy and paste the following script (recommended approach to preserve data):
```sql
-- Add the new 'name' column with a default value
ALTER TABLE orders ADD COLUMN name TEXT NOT NULL DEFAULT 'Unknown';

-- Add the new 'consent_to_email_marketing' column
ALTER TABLE orders ADD COLUMN consent_to_email_marketing BOOLEAN DEFAULT FALSE;
```
5. Click "Run" to execute the script

### Verification

After running the script, you can verify the table structure by running:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;
```

You should see the new columns: `name` and `consent_to_email_marketing`.

### Important Notes

- The `name` column is required (NOT NULL) and will store the customer's full name
- The `consent_to_email_marketing` column defaults to FALSE (customers must opt-in)
- Both changes are reflected in the application code to properly capture and display this information