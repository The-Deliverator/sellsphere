'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect if the user is not logged in
    } else {
      fetchProducts(token);
    }
  }, []);

  const fetchProducts = async (token) => {
    try {
      const res = await fetch('https://sellsphere-backend.onrender.com/api/products/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch products');
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (productId) => {
    router.push(`/dashboard/products/edit/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`https://sellsphere-backend.onrender.com/api/products/${productId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to delete product');

        setProducts(products.filter((product) => product.id !== productId)); // Remove deleted product from UI
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div style={containerStyle}>
      {/* 🌐 NAVIGATION */}
      <nav style={navStyle}>
        <h1 style={navTitle}>Sellsphere</h1>
        <div style={navButtonsContainer}>
          <button onClick={() => router.push('/')} style={navBtn}>Home</button>
          <button onClick={() => router.push('/about')} style={navBtn}>About</button>
          <button onClick={() => router.push('/products')} style={navBtn}>Products</button>
          <button onClick={() => router.push('/blog')} style={navBtn}>Blog</button>
          <button onClick={() => router.push('/contact')} style={navBtn}>Contact Us</button>
          <button onClick={() => router.push('/login')} style={{ ...navBtn, backgroundColor: '#333', color: '#fff' }}>Login</button>
        </div>
      </nav>

      {/* 🌟 ADD PRODUCT BUTTON */}
      <div style={addProductButtonContainer}>
        <button onClick={() => router.push('/dashboard/products/upload')} style={addProductButtonStyle}>
          Add Product
        </button>
      </div>

      <h2>Your Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={productStyle}>
              <strong>{product.title}</strong> — R{product.price}
              <br />
              <small>{product.description}</small>
              <br />
              <button onClick={() => handleEdit(product.id)} style={buttonStyle}>
                Edit
              </button>
              <button onClick={() => handleDelete(product.id)} style={deleteButtonStyle}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Styling for the page and the NavBar
const containerStyle = {
  padding: '2rem',
  fontFamily: 'sans-serif',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 2rem',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #eee',
  position: 'sticky',
  top: '0',
  zIndex: 1000,
};

const navTitle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
};

const navButtonsContainer = {
  display: 'flex',
  gap: '1rem',
};

const navBtn = {
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const addProductButtonContainer = {
  marginBottom: '1.5rem',
};

const addProductButtonStyle = {
  padding: '0.8rem 2rem',
  backgroundColor: '#0070f3',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

const productStyle = {
  marginBottom: '1.5rem',
  backgroundColor: '#fff',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  marginRight: '1rem',
  backgroundColor: '#333',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#e53935',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};