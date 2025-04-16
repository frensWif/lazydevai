
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0'
import nacl from 'https://esm.sh/tweetnacl@1.0.3'
import { decode as base58Decode } from 'https://esm.sh/bs58@5.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { publicKey, signature, message } = await req.json()
    
    // Validate inputs
    if (!publicKey || !signature || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Verify signature
    const encodedMessage = new TextEncoder().encode(message)
    const signatureUint8 = Uint8Array.from(Object.values(signature.data))
    const publicKeyUint8 = base58Decode(publicKey)
    
    const verified = nacl.sign.detached.verify(
      encodedMessage,
      signatureUint8,
      publicKeyUint8
    )

    if (!verified) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Signature verified, create or get user
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check if wallet exists
    const { data: existingWallets, error: walletError } = await supabase
      .from('user_wallets')
      .select('user_id')
      .eq('wallet_address', publicKey)
      .eq('wallet_type', 'phantom')
      .single()

    let userId

    if (existingWallets) {
      // Wallet exists, get user ID
      userId = existingWallets.user_id
    } else {
      // Create new user for this wallet
      const { data: userData, error: userError } = await supabase.auth.admin.createUser({
        email: `${publicKey.slice(0, 10)}@phantom.wallet`,
        password: crypto.randomUUID(),
        email_confirm: true,
        user_metadata: {
          wallet_address: publicKey,
          wallet_type: 'phantom'
        }
      })

      if (userError) {
        throw userError
      }

      userId = userData.user.id

      // Create wallet record
      await supabase
        .from('user_wallets')
        .insert({
          user_id: userId,
          wallet_address: publicKey,
          wallet_type: 'phantom'
        })
    }

    // Generate session for user
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.createSession({
      user_id: userId
    })

    if (sessionError) {
      throw sessionError
    }

    return new Response(
      JSON.stringify({ session: sessionData }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
