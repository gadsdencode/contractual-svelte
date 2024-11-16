<script>
  import { createClient } from '@supabase/supabase-js';
  import { Button } from 'shadcn-svelte'; // Import Button from shadcn-svelte

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

  export let item;
  let editedContent = item.content;

  // Dispatch an 'update' event when data is updated
  const dispatch = createEventDispatcher();

  const updateData = async () => {
    const { data, error } = await supabase
      .from('your_table')
      .update({ content: editedContent })
      .eq('id', item.id);

    if (error) {
      console.error('Error updating data:', error);
    } else {
      item.content = editedContent;
      dispatch('update'); // Dispatch the 'update' event
    }
  };
</script>

<div>
  <h3>Edit Data</h3>
  <input type="text" bind:value={editedContent} />
  <Button on:click={updateData}>Update</Button> {/* Use shadcn Button */}
</div>
