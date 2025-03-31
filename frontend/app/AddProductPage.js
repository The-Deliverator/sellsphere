'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    file: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('file', product.file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5001/api/products/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload product');

      alert('Product added successfully!');
      router.push('/dashboard'); // Redirect to the dashboard page after successful upload
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Add New Product</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="title"
          value={product.title}
          placeholder="Product Title"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          value={product.description}
          placeholder="Product Description"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="price"
          value={product.price}
          placeholder="Product Price (ZAR)"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

// Styling for the page
const containerStyle = {
  padding: '2rem',
  fontFamily: 'sans-serif',
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
  backgroundColor: '#0070f3',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};