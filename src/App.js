import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingHeart, faUsers, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// TODO: Database Integration Steps
// 1. Set up database (e.g., MongoDB, PostgreSQL)
// 2. Create user schema/model
// 3. Set up authentication middleware
// 4. Create API endpoints for user operations
// 5. Implement error handling and validation
// 6. Add loading states and success/error messages

function App() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="landing-page">
        <nav className="navbar">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="logo-link">
              <FontAwesomeIcon icon={faHeart} className="logo-icon" /> OrphanConnect
            </Link>
          </motion.div>
          <motion.div 
            className="nav-links"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" onClick={() => scrollToSection('mission')} className="nav-link">Mission</Link>
            <Link to="/" onClick={() => scrollToSection('features')} className="nav-link">Features</Link>
            <Link to="/" onClick={() => scrollToSection('contact')} className="nav-link">Contact</Link>
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={faUser} /> Login/Signup
            </Link>
            <motion.button 
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Involved
            </motion.button>
          </motion.div>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomeContent fadeInUp={fadeInUp} ref={ref} inView={inView} />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomeContent({ fadeInUp, ref, inView }) {
  return (
    <>
      <header className="hero">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Every Child <span className="highlight">Deserves</span><br />
            a Champion.
          </h1>
          <p className="hero-subtitle">
            Be the reason a child believes in love, hope, and a brighter tomorrow.
          </p>
          <motion.button 
            className="cta-button hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Champion
          </motion.button>
        </motion.div>
      </header>

      <section id="mission" className="section mission" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2><FontAwesomeIcon icon={faHandHoldingHeart} /> Our Mission</h2>
          <p>
            We connect orphans with compassionate individuals, families, and communities to
            provide love, education, and lifelong support.
          </p>
        </motion.div>
      </section>

      <section id="features" className="section features">
        <h2>What We Offer</h2>
        <div className="features-grid">
          {[
            {
              icon: faUsers,
              title: "Child Profiles",
              description: "Browse verified profiles of children looking for care and mentorship."
            },
            {
              icon: faHandHoldingHeart,
              title: "Donor Connect",
              description: "Support initiatives and directly fund the wellbeing of children."
            },
            {
              icon: faHeart,
              title: "Success Stories",
              description: "Read uplifting stories of lives transformed through connection."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p><FontAwesomeIcon icon={faEnvelope} /> support@orphanconnect.org</p>
            <p><FontAwesomeIcon icon={faPhone} /> +91 98765 43210</p>
          </div>
          <div className="social-links">
            <a href="https://facebook.com/orphanconnect" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com/orphanconnect" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com/orphanconnect" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 OrphanConnect. All rights reserved.</p>
      </footer>
    </>
  );
}

function LoginPage() {
  // TODO: Add state management for form data
  // const [formData, setFormData] = useState({ email: '', password: '' });
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Database Integration
    // 1. Validate form data
    // 2. Send login request to backend
    // 3. Handle response (success/error)
    // 4. Store authentication token
    // 5. Redirect to dashboard/home
    console.log('Login form submitted');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            required 
            // TODO: Add onChange handler
            // onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            // TODO: Add onChange handler
            // onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" className="cta-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}

function SignupPage() {
  // TODO: Add state management for form data
  // const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Database Integration
    // 1. Validate form data
    // 2. Check if passwords match
    // 3. Send signup request to backend
    // 4. Handle response (success/error)
    // 5. Store authentication token
    // 6. Redirect to dashboard/home
    console.log('Signup form submitted');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            // TODO: Add onChange handler
            // onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Email" 
            required 
            // TODO: Add onChange handler
            // onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            // TODO: Add onChange handler
            // onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required 
            // TODO: Add onChange handler
            // onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
          <button type="submit" className="cta-button">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default App;
