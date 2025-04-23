import { useState, useEffect } from 'react';

const useArticles = (shouldSort = false) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (shouldSort) {
          queryParams.append('sortBy', 'contentLength');
        }
        
        const url = `http://localhost:3010/articles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const articlesData = await response.json();
        setArticles(articlesData);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [articles, shouldSort]);

  return { articles };
};

export default useArticles; 