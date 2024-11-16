import { createClient } from '@supabase/supabase-js';

export const handle = async ({ event, resolve }) => {
  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

  event.locals.supabase = supabase;

  // Get the current session
  const session = await supabase.auth.getSession();
  event.locals.session = session.data.session;

  const response = await resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    }
  });

  return response;
};
