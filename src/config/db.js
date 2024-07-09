const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

exports.supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.API_KEY,
);
