'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadProductPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    file: null,
  });
  const [error, setError] = useState('');

  useState(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
    } else {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('title', formData.title);
    body.append('description', formData.description);
    body.append('price', formData.price);
    body.append('file', formData.file);

    try {
      const res = await fetch('http://localhost:5001/api/products/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload');

      alert('Product uploaded successfully!');
      router.push('/dashboard/products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>📤 Upload New Product</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Title:</label><br />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      /><br /><br />

      <label>Description:</label><br />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      /><br /><br />

      <label>Price (ZAR):</label><br />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      /><br /><br />

      <label>File:</label><br />
      <input
        type="file"
        name="file"
        accept=".pdf,.zip,.jpg,.png"
        onChange={handleChange}
        required
      /><br /><br />

      <button type="submit">Upload Product</button>
    </form>
  );
}