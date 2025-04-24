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

  const deleteArticle = async (articleId) => {
    try {
      const response = await fetch(
        `http://localhost:3010/articles/${articleId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
    } catch (error) {
      console.error('Error removing article:', error);
    }
  };

  return { articles, deleteArticle };
};

export default useArticles;
