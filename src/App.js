import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingHeart, faUsers, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './App.css';

function App() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,//if the element is 10% in view, trigger the animation
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },//opacity means transparency, y means vertical position
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FontAwesomeIcon icon={faHeart} className="logo-icon" /> OrphanConnect
        </motion.div>
        <motion.div 
          className="nav-links"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="#mission">Mission</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <motion.button 
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Involved
          </motion.button>
        </motion.div>
      </nav>

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
    </div>
  );
}

export default App;
