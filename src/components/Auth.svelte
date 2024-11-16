<script>
  import { createClient } from '@supabase/supabase-js';
  import { goto } from '$app/navigation';

  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

  let email, password;

  async function handleSignup() {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Signup error:', error);
    } else {
      goto('/dashboard'); // Redirect to dashboard after successful signup
    }
  }

  async function handleLogin() {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
    } else {
      goto('/dashboard'); // Redirect to dashboard after successful login
    }
  }
</script>

<div>
  <h2>Sign Up</h2>
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={handleSignup}>Sign Up</button>

  <h2>Login</h2>
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={handleLogin}>Login</button>
</div>
