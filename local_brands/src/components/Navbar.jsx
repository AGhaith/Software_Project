import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">LocalBrands</h1>

        <ul className="navbar-menu">
          <li className="navbar-item">Home</li>
          <li className="navbar-item">Brands</li>
          <li className="navbar-item">Categories</li>
          <li className="navbar-item">Contact</li>
        </ul>
      </div>
    </nav>
  );
}