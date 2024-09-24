
import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://wgcohagbrjxkmsdirxxo.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnY29oYWdicmp4a21zZGlyeHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NjUzOTUsImV4cCI6MjA0MDQ0MTM5NX0.0LQzpoynCHcEp3osuKIehRfg4PIpAhq7g8V7BSCGJ3M';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;