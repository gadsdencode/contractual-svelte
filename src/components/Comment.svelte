<script>
  // ... (existing code)
</script>

<div>
  <h3>Add Comment</h3>
  <input type="text" bind:value={newComment} placeholder="Enter your comment" />
  <button on:click={addComment}>Add Comment</button>
</div>
