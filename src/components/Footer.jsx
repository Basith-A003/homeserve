import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>HomeServe</h3>
          <p>Book trusted home services like AC repair, plumbing, electrical work, and cleaning in a few clicks.</p>
        </div>
        <div>
          <h4>Quick links</h4>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p>support@homeserve.com</p>
          <p>+91 98765 43210</p>
          <p>Chennai, India</p>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} HomeServe. All rights reserved.</p>
    </footer>
  );
}
