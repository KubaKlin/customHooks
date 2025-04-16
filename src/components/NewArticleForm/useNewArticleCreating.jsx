import { useState } from 'react';

export function useNewArticleCreating(
  title,
  content,
  isEditing = false,
  articleId = null,
  onClose = null,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');

    try {
      const url = isEditing
        ? `http://localhost:3010/articles/${articleId}`
        : 'http://localhost:3010/articles';

      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (isEditing) {
        setSuccessMessage('Article updated successfully');
      } else {
        setSuccessMessage(`Post with id ${data.id} created`);
      }
    } catch (error) {
      setSuccessMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    successMessage,
  };
}
