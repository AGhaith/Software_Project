import React, { useState, useEffect } from "react";
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
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageClass: "electronics",
    labelClass: "electronics",
  },
  {
    name: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageClass: "books",
    labelClass: "books",
  },
];

const ITEMS_PER_PAGE = 5;

export const CategoryList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const visibleCategories = categories.slice(
    currentSlide * ITEMS_PER_PAGE,
    (currentSlide + 1) * ITEMS_PER_PAGE
  );

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

      <div className="category-carousel">
        <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>
        <div className="category-grid">
          {visibleCategories.map((category, index) => (
            <div
              key={`${category.name}-${index}`}
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
          {/* Add empty placeholders to center the grid when there are fewer than 5 items */}
          {visibleCategories.length < ITEMS_PER_PAGE && 
            Array(ITEMS_PER_PAGE - visibleCategories.length).fill().map((_, i) => (
              <div key={`empty-${i}`} className="category-card empty" />
            ))
          }
        </div>
        <button className="carousel-button next" onClick={nextSlide}>&#10095;</button>
      </div>

      <div className="category-pagination">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${currentSlide === index ? 'active' : 'inactive'}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
