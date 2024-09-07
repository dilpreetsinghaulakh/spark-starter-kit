

const supabaseUrl = 'https://snrcslaycatzqpdffmxp.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
