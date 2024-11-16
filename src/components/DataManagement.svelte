<script>
  import { createClient } from '@supabase/supabase-js';
  // ... other imports

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

  let data = [];
  let comments = {};
  let users = {};
  let loading = true; // Add loading state
  let error = null;   // Add error state

  async function fetchData() {
    loading = true;
    const { data: fetchedData, error: fetchError } = await supabase.from('your_table').select('*');
    loading = false;
    if (fetchError) {
      console.error('Error fetching data:', fetchError);
      error = fetchError.message; // Store error message
    } else {
      data = fetchedData;
      error = null; // Clear any previous error
    }
  }

  async function fetchComments() {
    // ... (similar error handling as fetchData)
  }

  // ... (saveVersion, revertVersion, showNotification functions remain the same)

  // Real-time subscriptions with optimized updates
  let dataSubscription;
  let commentsSubscription;

  $: if (data.session) {
    dataSubscription = supabase
      .from('your_table')
      .on('*', (payload) => {
        // Check if the update affects the current view
        if (data.some(item => item.id === payload.new.id)) {
          fetchData();
        }
      })
      .subscribe();

    commentsSubscription = supabase
      .from('comments')
      .on('*', (payload) => {
        // Check if the update affects the current view
        if (comments[payload.new.item_id]) {
          fetchComments();
        }
      })
      .subscribe();
  }

  // ... (onDestroy remains the same)
</script>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p class="text-red-500">Error: {error}</p>
{:else}
  <div class="grid grid-cols-1 gap-4">
    {/* ... (rest of the component) */}
  </div>
{/if}
