CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount REAL NOT NULL,
  address TEXT,
  delivery_option TEXT,
  cart_items JSONB,
  delivery_fee REAL,
  consent_to_email_marketing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);