import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Crap.module.css';
import { fetchCraps } from '../services/api';
import defaultCrapImage from '../assets/crap.svg';

function Crap() {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const keyword = searchParams.get('keyword') || '';
  const distance = searchParams.get('distance') || '10';

  useEffect(() => {
    const loadCraps = async () => {
      setLoading(true);
      try {
        const data = await fetchCraps(keyword, distance);
        console.log('Data received from API:', data); // For debugging
        setItems(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setError("Failed to load items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadCraps();
  }, [keyword, distance]);

  return (
    <div className={styles.crapPage}>
      <h1 className={styles.pageTitle}>Available Items</h1>
      
      <div className={styles.searchSummary}>
        <p>
          Showing results for: {keyword ? `"${keyword}"` : 'All items'} 
          within {distance} km
        </p>
      </div>
      
      {loading ? (
        <div className={styles.loading}>Loading items...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : items.length > 0 ? (
        <div className={styles.itemsGrid}>
          {items.map(item => (
            <div key={item._id} className={styles.itemCard}>
              <div className={styles.itemImage}>
                <img 
                  src={item.images && item.images.length > 0 ? item.images[0] : defaultCrapImage} 
                  alt={item.title} 
                  onError={(e) => {e.target.src = defaultCrapImage}}
                />
              </div>
              <div className={styles.itemContent}>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.itemDescription}>{item.description}</p>
                <div className={styles.itemMeta}>
                  <span className={styles.itemStatus}>Status: {item.status}</span>
                  {item.owner && typeof item.owner === 'object' && (
                    <span className={styles.itemOwner}>By: {item.owner.name}</span>
                  )}
                </div>
                <a href={`/crap/${item._id}`} className={styles.viewButton}>
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>No items found matching your search criteria.</p>
          <p>Try adjusting your search terms or increasing the distance.</p>
        </div>
      )}
    </div>
  );
}

export default Crap;