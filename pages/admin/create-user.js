import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('entrepreneur');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    console.log('Supabase:', supabase); // ✅ Debug: Is supabase defined?

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    
    console.log('Supabase Response:', data); // ✅ Debug
    console.log('Supabase Error:', error);  // ✅ Debug

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('✅ User created! Check Auth and public.users');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Create User with Metadata</h1>
      <form onSubmit={createUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', margin: '10px 0', width: '300px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', margin: '10px 0', width: '300px' }}
        />
        <br />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{ padding: '10px', margin: '10px 0', width: '300px' }}
        />
        <br />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{ padding: '10px', margin: '10px 0', width: '300px' }}
        />
        <br />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: '10px', margin: '10px 0', width: '300px' }}
        >
          <option value="entrepreneur">Entrepreneur</option>
          <option value="investor">Investor</option>
          <option value="admin">Admin</option>
        </select>
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0033A0',
            color: 'white',
            border: 'none',
            marginTop: '20px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
      {message && <p style={{ marginTop: '20px' }}><strong>{message}</strong></p>}
      <br />
      <a href="/">← Back to Home</a>
    </div>
  );
}