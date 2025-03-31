'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://sellsphere-production-5dca.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={modalStyle}>
      <div style={formContainerStyle}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Register</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Link to Login page */}
        <p style={linkStyle}>
          Already have an account? <span onClick={() => router.push('/login')} style={linkTextStyle}>Login here</span>
        </p>

        {/* Close Button */}
        <button onClick={() => router.push('/')} style={closeButtonStyle}>Close</button>
      </div>
    </div>
  );
}

// Modal and Form Styles
const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const formContainerStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  minWidth: '300px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '0.8rem',
  marginBottom: '1rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
  color: '#333',
};

const buttonStyle = {
  padding: '0.8rem',
  backgroundColor: '#333',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

const linkStyle = {
  marginTop: '1rem',
  textAlign: 'center',
};

const linkTextStyle = {
  color: '#0070f3',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const closeButtonStyle = {
  padding: '0.8rem 2rem',
  backgroundColor: '#e53935',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
  marginTop: '1rem',
};