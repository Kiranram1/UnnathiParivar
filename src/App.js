import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingHeart, faUsers, faEnvelope, faPhone, faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

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
            <Link to="/signup" className="cta-button">
              Get Involved
            </Link>
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
  const navigate = useNavigate();

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
            onClick={() => navigate('/signup')}
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
  const [userType, setUserType] = useState('volunteer');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Your login logic here
      alert(`Logging in as ${userType}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    alert(`Switched to ${type} login`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        <div className="user-type-toggle">
          <button 
            className={`toggle-button ${userType === 'volunteer' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('volunteer')}
          >
            <FontAwesomeIcon icon={faUser} /> Volunteer
          </button>
          <button 
            className={`toggle-button ${userType === 'organization' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('organization')}
          >
            <FontAwesomeIcon icon={faHeart} /> Organization
          </button>
        </div>
        <div style={{ marginBottom: '1.5rem' }}></div>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? 'Logging in...' : `Login as ${userType}`}
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </p>
        <button className="back-button" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
        </button>
      </div>
    </div>
  );
}

function SignupPage() {
  const [userType, setUserType] = useState(''); // 'volunteer' or 'organization'
  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    email: '',
    phone: '',
    password: '',
    // Organization specific fields
    placeName: '',
    location: '',
    govtId: '',
    headCount: '',
    placeType: '',
    isGovtAided: false,
    dailyExpense: '',
    // Volunteer specific fields
    volunteerLocation: '',
    skills: '',
    availability: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      // TODO: Implement OTP sending logic
      console.log('Sending OTP...');
      setOtpSent(true);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // TODO: Implement form submission logic
      console.log('Form submitted:', { userType, ...formData });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderUserTypeSelection = () => (
    <div className="user-type-selection">
      <h2>Choose Registration Type</h2>
      <div className="user-type-options">
        <div className="user-type-card" onClick={() => setUserType('volunteer')}>
          <FontAwesomeIcon icon={faUsers} className="user-type-icon" />
          <h3>Volunteer</h3>
          <p>Join as a volunteer to help and support children in need</p>
        </div>
        <div className="user-type-card" onClick={() => setUserType('organization')}>
          <FontAwesomeIcon icon={faHandHoldingHeart} className="user-type-icon" />
          <h3>Organization</h3>
          <p>Register your organization to connect with volunteers and donors</p>
        </div>
      </div>
      <p className="login-link">
        Already registered? <Link to="/login">Login</Link>
      </p>
      <button className="back-button" onClick={() => setUserType('')}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Signup
      </button>
    </div>
  );

  const renderVolunteerForm = () => (
    <div className="auth-container signup-container">
      <h2>Volunteer Registration</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            required 
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div className="phone-input-group">
            <input 
              type="tel" 
              placeholder="Enter phone number" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <button 
              type="button" 
              className="otp-button"
              onClick={handleSendOTP}
              disabled={loading}
            >
              {otpSent ? 'Resend OTP' : 'Send OTP'}
            </button>
          </div>
        </div>

        {otpSent && (
          <div className="form-group">
            <label>OTP Verification</label>
            <input 
              type="text" 
              placeholder="Enter OTP" 
              required 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            placeholder="Enter your city/location" 
            required 
            value={formData.volunteerLocation}
            onChange={(e) => setFormData({...formData, volunteerLocation: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Skills/Interests</label>
          <select 
            required
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
          >
            <option value="">Select your skills</option>
            <option value="teaching">Teaching</option>
            <option value="counseling">Counseling</option>
            <option value="medical">Medical Support</option>
            <option value="sports">Sports Activities</option>
            <option value="arts">Arts & Crafts</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Availability</label>
          <select 
            required
            value={formData.availability}
            onChange={(e) => setFormData({...formData, availability: e.target.value})}
          >
            <option value="">Select availability</option>
            <option value="weekends">Weekends</option>
            <option value="weekdays">Weekdays</option>
            <option value="flexible">Flexible</option>
            <option value="specific">Specific Days</option>
          </select>
        </div>

        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register as Volunteer'}
        </button>
      </form>
      <p className="login-link">
        Already registered? <Link to="/login">Login</Link>
      </p>
      <button className="back-button" onClick={() => setUserType('')}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Signup
      </button>
    </div>
  );

  const renderOrganizationForm = () => (
    <div className="auth-container signup-container">
      <h2>Organization Registration</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Owner/Head Name</label>
          <input
            type="text"
            placeholder="Enter full name" 
            required
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div className="phone-input-group">
            <input
              type="tel"
              placeholder="Enter phone number" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <button 
              type="button" 
              className="otp-button"
              onClick={handleSendOTP}
              disabled={loading}
            >
              {otpSent ? 'Resend OTP' : 'Send OTP'}
            </button>
          </div>
        </div>

        {otpSent && (
          <div className="form-group">
            <label>OTP Verification</label>
            <input 
              type="text" 
              placeholder="Enter OTP" 
              required 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label>Place Name</label>
          <input 
            type="text" 
            placeholder="Enter organization name" 
            required 
            value={formData.placeName}
            onChange={(e) => setFormData({...formData, placeName: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text" 
            placeholder="Enter complete address" 
            required 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Government Identity</label>
          <input 
            type="text" 
            placeholder="Enter registration number" 
            required 
            value={formData.govtId}
            onChange={(e) => setFormData({...formData, govtId: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Head Count</label>
          <input 
            type="number" 
            placeholder="Enter number of children" 
            required 
            min="1"
            value={formData.headCount}
            onChange={(e) => setFormData({...formData, headCount: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Type of Place</label>
          <select 
            required
            value={formData.placeType}
            onChange={(e) => setFormData({...formData, placeType: e.target.value})}
          >
            <option value="">Select type</option>
            <option value="orphanage">Orphanage</option>
            <option value="shelter">Shelter Home</option>
            <option value="rehabilitation">Rehabilitation Center</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={formData.isGovtAided}
              onChange={(e) => setFormData({...formData, isGovtAided: e.target.checked})}
            />
            Government Aided
          </label>
        </div>

        <div className="form-group">
          <label>Daily Average Expense (₹)</label>
          <input 
            type="number" 
            placeholder="Enter daily expense" 
            required 
            min="0"
            value={formData.dailyExpense}
            onChange={(e) => setFormData({...formData, dailyExpense: e.target.value})}
          />
        </div>

        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register Organization'}
        </button>
      </form>
      <p className="login-link">
        Already registered? <Link to="/login">Login</Link>
      </p>
      <button className="back-button" onClick={() => setUserType('')}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Signup
      </button>
    </div>
  );

  return (
    <div className="auth-page">
      {!userType ? renderUserTypeSelection() : 
        userType === 'volunteer' ? renderVolunteerForm() : renderOrganizationForm()
      }
    </div>
  );
}

export default App;