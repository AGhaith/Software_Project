import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Heart, ShoppingCart, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import './Search.css';

const categories = [
  'Accessories',
  'Art & Collectibles',
  'Baby',
  'Bags & Purses',
  'Bath & Beauty',
  'Books, Movies & Music',
  'Clothing',
  'Craft Supplies & Tools',
  'Electronics & Accessories',
  'Gifts',
  'Home & Living',
  'Jewelry',
  'Paper & Party Supplies',
  'Pet Supplies',
  'Shoes',
  'Toys & Games',
  'Weddings'
];

const brands = [
  { name: 'ARTISAN CRAFTS', location: 'Cairo, Egypt', tags: ['Accessories', 'Home-made', 'Cloth', '+3 Others'] },
  { name: 'NILE TEXTILES', location: 'Alexandria, Egypt', tags: ['Cloth', 'Home-made', 'Accessories', '+2 Others'] },
  { name: 'SAHARA GOODS', location: 'Giza, Egypt', tags: ['Accessories', 'Home-made', 'Jewelry', '+4 Others'] },
  { name: 'PYRAMID DESIGNS', location: 'Luxor, Egypt', tags: ['Cloth', 'Accessories', 'Home-made', '+3 Others'] },
  { name: 'OASIS CREATIONS', location: 'Aswan, Egypt', tags: ['Accessories', 'Jewelry', 'Home-made', '+5 Others'] },
  { name: 'DELTA CRAFTERS', location: 'Mansoura, Egypt', tags: ['Home-made', 'Cloth', 'Accessories', '+2 Others'] }
];

export const Search = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="search-container">
      {/* Navbar */}
      <Navbar />

      {/* Tagline */}
      <div className="search-header">
        <p className="tagline">Shop wholesale online from over 100,000 brands</p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="categories-wrapper">
          <button 
            className="categories-button"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            Categories
          </button>
          
          {isCategoriesOpen && (
            <div className="categories-dropdown">
              {categories.map((category, index) => (
                <div key={index} className="category-item">
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for Products, Brands"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="search-icon" size={20} />
        </div>

        <div className="header-icons">
          <Link to="/wishlist" className="icon-link">
            <Heart size={28} strokeWidth={2} />
          </Link>
          <Link to="/cart" className="icon-link">
            <ShoppingCart size={28} strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="search-main">
        <div className="content-header">
          <h1 className="search-title">ACCESSORIES</h1>
          <p className="search-subtitle">Scarves, hats, and hair accessories that tie it all together</p>
        </div>

        <div className="filter-section">
          <button className="filter-button">
            <SlidersHorizontal size={20} />
            All Filters
          </button>
          <div className="items-count">1,000+ items Found</div>
        </div>

        {/* Brand Cards Grid */}
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-card">
              <div className="brand-info">
                <div className="avatar">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <div className="brand-name">{brand.name}</div>
                  <div className="brand-location">{brand.location}</div>
                </div>
              </div>
              <div className="tags">
                {brand.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className={`tag tag-${tagIndex === 0 ? 'orange' : tagIndex === 1 ? 'purple' : tagIndex === 2 ? 'teal' : 'gray'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-button">
            <ChevronDown className="chevron-left" size={20} />
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`page-button ${page === currentPage ? 'page-button-active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="page-button">
            <ChevronDown className="chevron-right" size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};