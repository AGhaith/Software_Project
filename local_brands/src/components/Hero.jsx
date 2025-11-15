import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">Discover Local Brands</h1>
      <p className="hero-subtitle">Find the best local products and services near you</p>

      <div className="hero-search-container">
        <input
          type="text"
          placeholder="Search for brands..."
          className="hero-search-input"
        />
        <button className="hero-search-button">
          Search
        </button>
      </div>
    </section>
  );
}