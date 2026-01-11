import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ggetdjfcvmnesntwqmqr.supabase.co'
const supabaseAnonKey = 'sb_publishable_k-LWdd3vVDULo2FO3jxPeQ_Z_0vmBai'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)