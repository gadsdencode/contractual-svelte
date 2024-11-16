<script>
  import { createClient } from '@supabase/supabase-js';
  import { Button } from 'shadcn-svelte';

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

  export let fetchData; // Receive fetchData as a prop
  let newContent;

  const createData = async () => {
    const { data, error } = await supabase.from('your_table').insert([{ content: newContent }]);
    if (error) {
      console.error('Error creating data:', error);
    } else {
      newContent = '';
      fetchData(); // Call fetchData to refresh data after creation
    }
  };
</script>

<div>
  <h3>Create Data</h3>
  <input type="text" bind:value={newContent} placeholder="Enter new data" />
  <Button on:click={createData}>Create</Button>
</div>
