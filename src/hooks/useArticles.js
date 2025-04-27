import { useState, useEffect } from 'react';

const useArticles = (shouldSort = false, searchQuery = '') => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (shouldSort) {
          queryParams.append('sortBy', 'contentLength');
        }
        if (searchQuery) {
          queryParams.append('search', searchQuery);
        }

        const url = `http://localhost:3010/articles?${queryParams.toString()}`;
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
  }, [shouldSort, searchQuery]);

  return { articles };
};

export default useArticles;
