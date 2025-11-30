import React from "react";
import "./CategoryList.css";

const categories = [
  {
    name: "Clothing",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-5.png",
    imageClass: "clothing",
    labelClass: "clothing",
  },
  {
    name: "Accessories",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-7.png",
    imageClass: "accessories",
    labelClass: "accessories",
  },
  {
    name: "Décor",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-9.png",
    imageClass: "decor",
    labelClass: "decor",
  },
  {
    name: "Cosmetics",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-10.png",
    imageClass: "cosmetics",
    labelClass: "cosmetics",
  },
  {
    name: "Art",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-11.png",
    imageClass: "art",
    labelClass: "art",
  },
];

export const CategoryList = () => {
  return (
    <section className="category-section">
      <img
        className="category-vector"
        alt="Vector"
        src="https://c.animaapp.com/mijkxqh6XSKe3B/img/vector-3-1.svg"
      />

      <div className="category-gradient" />

      <h2 className="category-title animate-fade-in animate-delay">
        Shop by Category
      </h2>

      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card animate-fade-in"
            style={{ "--animation-delay": `${400 + index * 100}ms` }}
          >
            <img
              className={`category-image ${category.imageClass}`}
              alt={category.name}
              src={category.image}
            />

            <div className="category-label-container">
              <div className={`category-label ${category.labelClass}`}>
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="category-pagination">
        <button className="pagination-dot active" />
        <button className="pagination-dot inactive" />
        <button className="pagination-dot inactive" />
      </div>
    </section>
  );
};
