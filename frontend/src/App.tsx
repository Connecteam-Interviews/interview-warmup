import { useEffect, useState } from 'react';

export default function App() {
  const [status, setStatus] = useState('checking…');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((body: { status?: string }) => setStatus(body.status ?? 'ok'))
      .catch(() => setStatus('backend not reachable'));
  }, []);

  return (
    <main>
      <h1>Interview laptop prep</h1>
      <p>If this page loaded and the API reads <strong>{status}</strong>, your Python + Node setup works.</p>
      <p className="hint">On interview day you will clone a different private repo. Keep this GitHub account logged in.</p>
    </main>
  );
}
