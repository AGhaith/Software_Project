import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">LocalBrands</Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">Brands</li>
          <li className="navbar-item">Categories</li>
          <li className="navbar-item">Contact</li>
          
          {/* Account Dropdown */}
          <li className="navbar-item account-dropdown">
            <span>Account</span>
            <div className="dropdown-menu">
              <Link to="/signin" className="dropdown-item">
                Sign In
              </Link>
              <div className="dropdown-divider"></div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}