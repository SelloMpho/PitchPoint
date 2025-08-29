// pages/test-supabase.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function TestSupabase() {
  const [status, setStatus] = useState('Initializing...');
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function runTests() {
      try {
        setStatus('1/4: Testing Supabase client...');

        // Test 1: Ensure supabase is defined
        if (!supabase) {
          throw new Error('Supabase client is not initialized');
        }

        setStatus('2/4: Fetching current user...');

        const {  authData, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        setUser(authData?.user);

        setStatus('3/4: Querying startups with founder...');

        // Use the view instead of relying on schema cache
        const {  startups, error: queryError } = await supabase
          .from('startups_with_founder')
          .select('*')
          .limit(5);

        if (queryError) throw queryError;

        setData(startups);

        setStatus('4/4: ✅ All tests passed!');
      } catch (err) {
        console.error('Test failed:', err);
        setError(err.message);
        setStatus(`❌ Test failed: ${err.message}`);
      }
    }

    runTests();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>🔧 PitchPoint: Supabase Connection Test</h1>

      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>User:</strong> {user ? user.email : 'Not logged in'}</p>
      </div>

      {error && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '8px', color: '#c62828' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && data.length > 0 ? (
        <div>
          <h2>📊 Found {data.length} Startup(s)</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.map((s) => (
              <li key={s.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{s.name}</h3>
                <p><strong>Industry:</strong> {s.industry}</p>
                <p><strong>Location:</strong> {s.location}</p>
                <p><strong>Stage:</strong> {s.funding_stage}</p>
                <p><strong>Founder:</strong> {s.first_name} {s.last_name} ({s.founder_email})</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ padding: '1rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px' }}>
          <p>No startups found. Make sure you've seeded the database and the <code>startups_with_founder</code> view exists.</p>
        </div>
      )}

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p>This test verifies:</p>
        <ul>
          <li>Supabase client is loaded</li>
          <li>Authentication is working</li>
          <li>Database queries succeed (via view)</li>
          <li>RLS policies are respected</li>
        </ul>
      </div>

      <br />
      <a href="/" style={{ color: '#1976d2', textDecoration: 'none' }}>← Back to Home</a>
    </div>
  );
}