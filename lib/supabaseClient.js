import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(https://niurjiqpapuwxokzovut.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdXJqaXFwYXB1d3hva3pvdnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MzQyMjksImV4cCI6MjA2OTAxMDIyOX0.Fe2SvlMcjB0wFaFVt7zl3i1y_yBILBkzGv_oN4bYNDE)
