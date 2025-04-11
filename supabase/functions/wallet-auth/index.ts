
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1';
import * as nacl from 'https://esm.sh/tweetnacl@1.0.3';
import { decode as decodeBase58 } from 'https://esm.sh/bs58@5.0.0';

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
    
    if (!publicKey || !signature || !message) {
      throw new Error('Missing required parameters: publicKey, signature, or message');
    }

    // Verify the signature
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = new Uint8Array(signature.data);
    const publicKeyBytes = decodeBase58(publicKey);
    
    const verified = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );

    if (!verified) {
      throw new Error('Invalid signature');
    }
    
    console.log('Signature verified successfully');
    
    // Check if user with this wallet exists
    const { data: existingWallet, error: lookupError } = await supabase
      .from('user_wallets')
      .select('user_id')
      .eq('wallet_address', publicKey)
      .single();
    
    let userId;
    
    // If wallet doesn't exist, create a new user and connect it
    if (!existingWallet) {
      console.log('Creating new user for wallet:', publicKey);
      
      // Create a new user with a random email (wallet-based)
      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
        email: `${publicKey.substring(0, 8)}@phantom.wallet`,
        password: crypto.randomUUID().replace(/-/g, ''),
        email_confirm: true,
        user_metadata: { wallet_address: publicKey }
      });
      
      if (signUpError) throw signUpError;
      userId = newUser.user.id;
      
      // Store wallet information
      const { error: insertError } = await supabase
        .from('user_wallets')
        .insert({
          user_id: userId,
          wallet_address: publicKey,
          wallet_type: 'phantom'
        });
        
      if (insertError) throw insertError;
      
      console.log('Created new user and wallet connection:', userId);
    } else {
      userId = existingWallet.user_id;
      console.log('Found existing user for wallet:', userId);
    }
    
    // Sign in the user by creating a new session
    const { data: session, error: sessionError } = await supabase.auth.admin.createSession({
      user_id: userId
    });
    
    if (sessionError) throw sessionError;
    
    return new Response(
      JSON.stringify({ 
        session,
        redirectTo: '/auth/callback?wallet=true' 
      }),
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
