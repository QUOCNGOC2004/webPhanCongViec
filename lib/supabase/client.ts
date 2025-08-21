import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vrjsepznjrajuagrglbb.supabase.co"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyanNlcHpuanJhanVhZ3JnbGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTgyNTEsImV4cCI6MjA3MTMzNDI1MX0.aM3JJL0uaS86BG52ZrCh1Nkseb4FNpPNqra6eE8hzqg"

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
