import './FeaturedBrands.css';

const brands = [
  { id: 1, name: "Urban Coffee", desc: "Fresh local brews daily", img: "https://via.placeholder.com/200" },
  { id: 2, name: "Crafty Hands", desc: "Handmade artisan products", img: "https://via.placeholder.com/200" },
  { id: 3, name: "TechHive", desc: "Local tech accessories", img: "https://via.placeholder.com/200" },
  { id: 4, name: "Green Grocer", desc: "Organic local produce", img: "https://via.placeholder.com/200" },
  { id: 5, name: "Fashion Hub", desc: "Stylish local clothing", img: "https://via.placeholder.com/200" },
];

export default function FeaturedBrands() {
  return (
    <section className="featured-brands">
      <div className="featured-brands-container">
        <h2 className="featured-brands-title">Featured Brands</h2>
        <div className="featured-brands-grid">
          {brands.map((b) => (
            <div key={b.id} className="featured-brand-card">
              <img src={b.img} alt={b.name} className="featured-brand-image" />
              <h3 className="featured-brand-name">{b.name}</h3>
              <p className="featured-brand-desc">{b.desc}</p>
              <button className="featured-brand-button">
                View More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}