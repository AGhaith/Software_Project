import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import axios from 'axios';
import './Brand.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5033/api/Brand';
const ITEMS_PER_PAGE = 6;

export const Brand = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/get-all`);
        setBrands(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError('Failed to load brands. Please try again later.');
        setBrands([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(brands.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBrands = brands.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="brand-container">
      <Navbar />

      <div className="brand-header">
        <h1 className="brand-title">DISCOVER BRANDS</h1>
        <p className="brand-subtitle">Explore our curated collection of local and international brands</p>
      </div>

      <div className="brand-controls"></div>

      <main className="brand-main">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading brands...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="results-count">
              {brands.length} {brands.length === 1 ? 'brand' : 'brands'} found
            </div>

            <div className="brands-grid">
              {paginatedBrands.length > 0 ? (
                paginatedBrands.map((brand, index) => (
                  <div key={brand.id || index} className="brand-card">
                    <div className="brand-card-header">
                      <div className="brand-logo-container">
                        {brand.logoUrl ? (
                          <img src={brand.logoUrl} alt={brand.name} className="brand-logo" />
                        ) : (
                          <div className="brand-logo-placeholder">
                            {brand.name?.charAt(0)?.toUpperCase() || 'B'}
                          </div>
                        )}
                      </div>
                      <div className="brand-basic-info">
                        <h3 className="brand-name">{brand.name}</h3>
                        <div className="brand-location">{brand.location || 'Location not specified'}</div>
                      </div>
                    </div>
                    
                    {brand.description && (
                      <p className="brand-description">
                        {brand.description.length > 120 
                          ? `${brand.description.substring(0, 120)}...` 
                          : brand.description}
                      </p>
                    )}
                    
                    {brand.categories?.length > 0 && (
                      <div className="brand-tags">
                        {brand.categories.slice(0, 3).map((category, idx) => (
                          <span 
                            key={category.id || idx}
                            className={`brand-tag ${idx % 3 === 0 ? 'tag-orange' : idx % 3 === 1 ? 'tag-purple' : 'tag-teal'}`}
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-brands">
                  <p>No brands found.</p>
                </div>
              )}
            </div>

            {/* Pagination - Always show at least page 1 with buttons */}
            <div className="pagination">
              <button 
                className="page-button prev-button" 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Always show page 1 */}
              <button
                className={`page-button ${currentPage === 1 ? 'page-button-active' : ''}`}
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
              
              {/* Show additional pages if they exist */}
              {totalPages > 1 && Array.from({ length: Math.min(4, totalPages - 1) }, (_, i) => {
                const pageNum = i + 2;
                if (totalPages <= 5) {
                  return (
                    <button
                      key={pageNum}
                      className={`page-button ${currentPage === pageNum ? 'page-button-active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                }
                
                // Handle ellipsis for many pages
                if (currentPage <= 3) {
                  if (pageNum <= 4) {
                    return (
                      <button
                        key={pageNum}
                        className={`page-button ${currentPage === pageNum ? 'page-button-active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  if (pageNum === 5 && totalPages > 5) {
                    return <span key="ellipsis" className="page-ellipsis">...</span>;
                  }
                } else if (currentPage >= totalPages - 2) {
                  if (pageNum >= totalPages - 3) {
                    const actualPage = totalPages - (4 - i);
                    return (
                      <button
                        key={actualPage}
                        className={`page-button ${currentPage === actualPage ? 'page-button-active' : ''}`}
                        onClick={() => handlePageChange(actualPage)}
                      >
                        {actualPage}
                      </button>
                    );
                  }
                } else {
                  if (i === 0) {
                    return <span key="ellipsis1" className="page-ellipsis">...</span>;
                  } else if (i <= 3) {
                    const actualPage = currentPage - 1 + i;
                    if (actualPage <= totalPages) {
                      return (
                        <button
                          key={actualPage}
                          className={`page-button ${currentPage === actualPage ? 'page-button-active' : ''}`}
                          onClick={() => handlePageChange(actualPage)}
                        >
                          {actualPage}
                        </button>
                      );
                    }
                  }
                }
                return null;
              })}
              
              {/* Show last page if there are many pages */}
              {totalPages > 5 && currentPage <= totalPages - 3 && (
                <>
                  <span className="page-ellipsis">...</span>
                  <button
                    key={totalPages}
                    className={`page-button ${currentPage === totalPages ? 'page-button-active' : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button 
                className="page-button next-button" 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </main>
      <Footer showCTA={false} />
    </div>
  );
};