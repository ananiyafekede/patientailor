import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://irlycesrlancnwulmcav.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlybHljZXNybGFuY253dWxtY2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxOTkwMzMsImV4cCI6MjA0ODc3NTAzM30.clw6taHz9BYuj9qtGOg9TSiikaHtaSEBeYmyHLejmH8";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);