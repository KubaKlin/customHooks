import { useState, useEffect } from 'react';

const useArticles = () => {
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesResponse] = await Promise.all([
          fetch('http://localhost:3010/articles'),
        ]);
        const articlesData = await articlesResponse.json();
        setArticles(articlesData);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [articles]);

  return { articles };
};

export default useArticles; 