const useArticleDelete = () => {
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

  return { deleteArticle };
};

export default useArticleDelete;
