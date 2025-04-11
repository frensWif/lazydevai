
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    // Initialize Supabase client with service role for admin functions
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const { publicKey, signature, message } = await req.json();
    
    // Here you would verify the signature with the Solana web3 libraries
    // This is a simplified implementation for demonstration
    
    // Check if user with this wallet exists
    const { data: existingUser, error: lookupError } = await supabase
      .from('user_wallets')
      .select('user_id')
      .eq('wallet_address', publicKey)
      .single();
    
    if (lookupError && lookupError.code !== 'PGRST116') {
      throw lookupError;
    }
    
    let userId;
    
    // If user doesn't exist, create one
    if (!existingUser) {
      // Create a new user
      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
        email: `${publicKey}@phantom.wallet`,
        password: signature.slice(0, 72), // Limit password length
        email_confirm: true,
        user_metadata: { wallet_address: publicKey }
      });
      
      if (signUpError) throw signUpError;
      userId = newUser.user.id;
      
      // Store wallet information
      await supabase
        .from('user_wallets')
        .insert({
          user_id: userId,
          wallet_address: publicKey,
          wallet_type: 'phantom'
        });
    } else {
      userId = existingUser.user_id;
    }
    
    // Sign in the user by creating a new session
    const { data: session, error: sessionError } = await supabase.auth.admin.createSession({
      user_id: userId
    });
    
    if (sessionError) throw sessionError;
    
    return new Response(
      JSON.stringify({ session }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    );
  }
});
