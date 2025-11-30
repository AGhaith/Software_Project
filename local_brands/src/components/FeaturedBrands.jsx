import React from "react";
import "./FeaturedBrands.css";

const features = [
  {
    icon: "https://c.animaapp.com/mijkxqh6XSKe3B/img/frame.svg",
    title: "Free Shipping",
    description: "Lorem some jnosw",
    colorClass: "orange",
  },
  {
    icon: "https://c.animaapp.com/mijkxqh6XSKe3B/img/frame-10.svg",
    title: "Free Shipping",
    description: "Lorem some jnosw",
    colorClass: "teal",
  },
  {
    icon: "https://c.animaapp.com/mijkxqh6XSKe3B/img/frame-8.svg",
    title: "Free Shipping",
    description: "Lorem some jnosw",
    colorClass: "purple",
  },
];

const products = [
  {
    name: "Hand-Knitted Wool Scarf",
    seller: "by Sarah's Crafts",
    price: "$45.00",
    rating: "4.7",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-13.png",
    imageClass: "scarf",
    stars: "https://c.animaapp.com/mijkxqh6XSKe3B/img/group-4.png",
  },
  {
    name: "Hand-painted ceramics",
    seller: "by Sarah's Crafts",
    price: "$45.00",
    rating: "4.7",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-17.png",
    imageClass: "ceramics",
    stars: "https://c.animaapp.com/mijkxqh6XSKe3B/img/group-4-1.png",
  },
  {
    name: "Organic honey jars",
    seller: "by Sarah's Crafts",
    price: "$45.00",
    rating: "4.7",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-18.png",
    imageClass: "honey",
    stars: "https://c.animaapp.com/mijkxqh6XSKe3B/img/group-4-2.png",
  },
  {
    name: "Artisan sourdough bread",
    seller: "by Sarah's Crafts",
    price: "$45.00",
    rating: "4.7",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/image-19.png",
    imageClass: "bread",
    stars: "https://c.animaapp.com/mijkxqh6XSKe3B/img/group-4-3.png",
  },
];

export const FeaturedBrands = () => {
  return (
    <>
      <div className="features-card animate-fade-in animate-delay">
        <div className="features-content">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-content-wrapper">
                <div className={`feature-icon-container ${feature.colorClass}`}>
                  <img
                    className="feature-icon"
                    alt="Feature icon"
                    src={feature.icon}
                  />
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
              <div className={`feature-line ${feature.colorClass}`} />
            </div>
          ))}
        </div>
      </div>

      <section className="trending-section">
        <h2 className="trending-title animate-fade-in animate-delay">
          Trending Near You
        </h2>

        <div className="products-grid">
          {products.map((product, index) => (
            <div
              key={index}
              className="product-card animate-fade-in"
              style={{ "--animation-delay": `${400 + index * 100}ms` }}
            >
              <div className="product-image-container">
                <img
                  className={`product-image ${product.imageClass}`}
                  alt={product.name}
                  src={product.image}
                />
                <div className="product-price">{product.price}</div>
              </div>

              <div className="product-rating-container">
                <img
                  className="product-stars"
                  alt="Rating stars"
                  src={product.stars}
                />
                <div className="product-rating">{product.rating}</div>
              </div>

              <h3 className="product-name">{product.name}</h3>

              <p className="product-seller">{product.seller}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
