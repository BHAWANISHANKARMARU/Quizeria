import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/ChatGPT_Image_Jul_15__2025__04_10_06_PM-removebg-preview.png'; // Update if needed

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <img src={logo} alt="BSM Logo" style={styles.logo} />
      <p style={styles.text}>© Bhawani Shankar Maru</p>

      <div style={styles.socialLinks}>
        <a href="https://www.linkedin.com/in/bhawanishankarmaru" target="_blank" rel="noopener noreferrer" style={styles.link}>
          <FaLinkedin style={{ ...styles.icon, color: '#0A66C2' }} />
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/BHAWANISHANKARMARU" target="_blank" rel="noopener noreferrer" style={styles.link}>
          <FaGithub style={{ ...styles.icon, color: '#fff' }} />
          <span>GitHub</span>
        </a>
        <a href="https://www.instagram.com/bhawanis._ru/" target="_blank" rel="noopener noreferrer" style={styles.link}>
          <FaInstagram style={{ ...styles.icon, color: '#E4405F' }} />
          <span>Instagram</span>
        </a>
        <a href="mailto:bhawanishankarmaru2005@gmail.com" style={styles.link}>
          <FaEnvelope style={{ ...styles.icon, color: '#FF6B6B' }} />
          <span>Email</span>
        </a>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    // 🔻 Background intentionally removed
    padding: '50px 50px 55px',
    color: '#fff',
    textAlign: 'center',
    zIndex: 999,
  },
  logo: {
    height: '65px',
    marginBottom: '15px',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
  },
  text: {
    fontSize: '17px',
    fontWeight: '600',
    marginBottom: '20px',
    marginTop: 0,
    fontFamily: `'Roboto Condensed', sans-serif`,
    letterSpacing: '0.5px',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '35px',
    flexWrap: 'wrap',
    fontSize: '17px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: '#ffffff',
    fontWeight: '500',
    transition: 'all 0.3s ease-in-out',
  },
  icon: {
    fontSize: '26px',
    transition: 'transform 0.3s ease',
  },
};
