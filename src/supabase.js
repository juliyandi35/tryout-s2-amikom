import { createClient } from '@supabase/supabase-js'

const env = import.meta.env || {} // skrip pengecekan di Node murni tidak punya import.meta.env
const url = env.VITE_SUPABASE_URL
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY

// Kunci publishable memang dirancang ada di browser; keamanan data dijaga RLS di database.
// Tanpa konfigurasi, aplikasi tetap jalan lokal tanpa login (hanya localStorage).
export const supabase = url && key ? createClient(url, key) : null
