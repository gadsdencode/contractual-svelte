<script>
  import { createClient } from '@supabase/supabase-js';
  import DataManagement from '../../components/DataManagement.svelte';

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

  export let data;

  // Check if the user is logged in
  if (!data.session) {
    throw redirect(303, '/'); // Redirect to login if not logged in
  }
</script>

<h1>Dashboard</h1>
<p>Welcome, {data.session.user.email}!</p>

<DataManagement data={data}/>
