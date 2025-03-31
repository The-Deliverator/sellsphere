'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiry: ''
  });
  const router = useRouter();

  useEffect(() => {
    fetch('https://sellsphere-backend.onrender.com/api/products/all')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can add further logic here to process or send the form data (e.g., send to an API or email service)
    alert('Your enquiry has been submitted!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f8f9fa', color: '#333' }}>
      {/* 🌐 NAVIGATION */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Sellsphere</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => scrollToSection('about')} style={navBtn}>About</button>
          <button onClick={() => scrollToSection('products')} style={navBtn}>Products</button>
          <button onClick={() => scrollToSection('blog')} style={navBtn}>Blog</button>
          <button onClick={() => scrollToSection('contact')} style={navBtn}>Contact Us</button>
          <button onClick={() => router.push('/login')} style={navBtn}>Login</button>
          <button onClick={() => router.push('/register')} style={{ ...navBtn, backgroundColor: '#333', color: '#fff' }}>Register</button>
        </div>
      </nav>

      {/* 💬 HERO SECTION */}
      <section id="hero" style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)',
        color: '#333'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Discover. Support. Download.</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: 'auto' }}>
          Buy and support your favorite creators — from music and eBooks to software, art, and beyond.
        </p>
      </section>

      {/* 💡 ABOUT SECTION */}
      <section id="about" style={{
        padding: '3rem 2rem',
        backgroundColor: '#fff',
        borderTop: '1px solid #eee',
        color: '#444',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>📖 About Sellsphere</h3>
        <p style={{ maxWidth: '700px', margin: 'auto', fontSize: '1rem' }}>
          Sellsphere is a youth-driven digital marketplace built for creators by creators.
          We help musicians, designers, writers, and coders share and sell their digital work with the world.
          No noise, no middlemen — just creators and their community.
        </p>
      </section>

      {/* 🛍️ PRODUCT SECTION */}
      <section id="products" style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: 'auto' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>🛒 Explore Products</h3>

        {products.length === 0 ? (
          <p>No products yet. Be the first to upload!</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            {products.map((product) => (
              <div key={product.id} style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '1.2rem',
                boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Placeholder for image */}
                <div style={{
                  backgroundColor: '#eee',
                  height: '150px',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}></div>

                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#666', flexGrow: 1 }}>{product.description}</p>
                <p style={{ fontWeight: 'bold', margin: '1rem 0 0.5rem' }}>R{product.price}</p>
                <a href={`https://sellsphere-backend.onrender.com/${product.file_path}`} target="_blank" rel="noreferrer"
                  style={{ fontSize: '0.9rem', color: '#0070f3', textDecoration: 'underline' }}>
                  Preview File
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 📚 BLOG SECTION */}
      <section id="blog" style={{
        padding: '3rem 2rem',
        backgroundColor: '#fafafa',
        color: '#333',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>📝 Creative Industries Blog</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {/* Blog Post 1 */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '1.5rem',
            boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>🎨 The Art of Graphic Design</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Graphic design is more than just visuals. It’s about creating a meaningful connection with the audience. Learn how graphic designers are revolutionizing the digital world through innovative designs.
            </p>
          </div>

          {/* Blog Post 2 */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '1.5rem',
            boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>🎵 Music Production in the Digital Age</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              With the rise of digital tools, music production has transformed. Dive into the world of digital music creation and discover how producers are shaping the future of sound.
            </p>
          </div>

          {/* Blog Post 3 */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '1.5rem',
            boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>📚 The Rise of Digital Publishing</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              The digital age has brought new opportunities for authors and writers. Explore how eBooks, audiobooks, and online publishing are changing the way stories are shared.
            </p>
          </div>

          {/* Blog Post 4 */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '1.5rem',
            boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>💻 The Future of Software Development</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Software development continues to evolve rapidly. Discover how new technologies and frameworks are shaping the future of programming and web development.
            </p>
          </div>
        </div>
      </section>

      {/* 📬 ENQUIRY FORM SECTION */}
      <section id="contact" style={{
        padding: '3rem 2rem',
        backgroundColor: '#fff',
        color: '#333',
        textAlign: 'center',
        borderTop: '1px solid #eee'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>📞 Contact Us</h3>
        
        <p style={{
          fontSize: '1rem',
          marginBottom: '2rem',
          color: '#555'
        }}>
          Have any questions or inquiries? Reach out to us by filling out the form below.
        </p>

        <form style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '600px',
          margin: 'auto',
          padding: '2rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
        }} onSubmit={handleFormSubmit}>
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
          
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />

          <textarea
            name="enquiry"
            placeholder="Your Enquiry"
            value={formData.enquiry}
            onChange={handleInputChange}
            required
            rows="5"
            style={{ ...inputStyle, marginBottom: '1rem' }}
          />

          <button type="submit" style={{
            padding: '0.8rem 2rem',
            backgroundColor: '#333',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}>
            Submit Enquiry
          </button>
        </form>
      </section>

      {/* 🧾 FOOTER */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f1f1f1',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        &copy; {new Date().getFullYear()} Sellsphere. All rights reserved.
      </footer>
    </div>
  );
}

// 🎨 Reusable button styles
const navBtn = {
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const inputStyle = {
  padding: '0.8rem',
  marginBottom: '1rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  color: '#333',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}