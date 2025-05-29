import { useState } from 'react';

const useArticleEdit = () => {
  const [open, setOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const handleOpen = (article = null) => {
    setEditingArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingArticle(null);
  };

  const handleEdit = async (articleId, updatedArticle) => {
    try {
      const response = await fetch(
        `http://localhost:3010/articles/${articleId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedArticle),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      return true;
    } catch (error) {
      console.error('Error updating article:', error);
      return false;
    }
  };

  return {
    open,
    editingArticle,
    handleOpen,
    handleClose,
    handleEdit,
  };
};

export default useArticleEdit;
