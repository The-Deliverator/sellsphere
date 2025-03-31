'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [token, setToken] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
      return;
    }

    setToken(storedToken);
    fetch(`https://sellsphere-production-5dca.up.railway.app/api/products/mine`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(res => res.json())
      .then(data => {
        const match = data.products.find(p => p.id == id);
        if (!match) return setError('Product not found');
        setProduct(match);
      })
      .catch(err => setError('Failed to fetch product'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://sellsphere-production-5dca.up.railway.app/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price: product.price,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');
      
      alert('Product updated!');
      router.push('/dashboard/products');
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>✏️ Edit Product</h2>

        <label>Title:</label><br />
        <input
          type="text"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          required
          style={inputStyle}
        /><br /><br />

        <label>Description:</label><br />
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          required
          style={inputStyle}
        /><br /><br />

        <label>Price (ZAR):</label><br />
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
          style={inputStyle}
        /><br /><br />

        <button type="submit" style={buttonStyle}>Save Changes</button>
      </form>
    </div>
  );
}

// Styling for the page
const containerStyle = {
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  height: '100vh',
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '500px',
};

const inputStyle = {
  padding: '0.8rem',
  marginBottom: '1rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
  color: '#333',
  width: '100%',
};

const buttonStyle = {
  padding: '0.8rem 2rem',
  backgroundColor: '#333',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};