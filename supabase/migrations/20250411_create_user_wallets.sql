
-- Create table for user wallet connections
CREATE TABLE IF NOT EXISTS public.user_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  wallet_address TEXT NOT NULL UNIQUE,
  wallet_type TEXT NOT NULL, -- 'phantom', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see their own wallet connections
CREATE POLICY "Users can view their own wallet connections"
ON public.user_wallets
FOR SELECT
USING (auth.uid() = user_id);

-- Create function to automatically set updated_at on update
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set updated_at on update
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.user_wallets
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- Create policy to allow the service role to update wallet connections
CREATE POLICY "Service role can manage wallet connections"
ON public.user_wallets
USING (true)
WITH CHECK (true);
