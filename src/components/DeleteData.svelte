<script>
  import { createClient } from '@supabase/supabase-js';

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

  export let item; // Receive the item to delete as a prop

  const deleteData = async () => {
    const { data, error } = await supabase.from('your_table').delete().eq('id', item.id);
    if (error) {
      console.error('Error deleting data:', error);
    } else {
      // Remove the item from the UI or re-fetch data after successful deletion
      // Trigger a re-render of the parent component to reflect the change
      item = null; // Set item to null to trigger re-render in parent
    }
  };
</script>

<div>
  <h3>Delete Data</h3>
  <button on:click={deleteData}>Delete</button>
</div>
