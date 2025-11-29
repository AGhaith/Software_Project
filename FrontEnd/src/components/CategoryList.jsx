import './CategoryList.css';

const categories = ["Food", "Clothing", "Handmade", "Tech", "Services"];

export default function Categories() {
  return (
    <section className="categories">
      <div className="categories-container">
        <h2 className="categories-title">Categories</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <button
              key={cat}
              className="category-button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}