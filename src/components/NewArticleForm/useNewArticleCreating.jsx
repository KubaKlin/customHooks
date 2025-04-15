import { useState } from 'react';

export function useNewArticleCreating(title, content) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    const response = await fetch('http://localhost:3000/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    const data = await response.json();
    setSuccessMessage(`Post with id ${data.id} created`);
    setIsLoading(false);
  };

  return {
    handleSubmit,
    isLoading,
    successMessage,
  };
}