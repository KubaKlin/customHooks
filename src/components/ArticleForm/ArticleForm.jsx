import { useArticleForm } from './useArticleForm';
import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';

export const ArticleForm = ({ article, isEditing, onSubmit }) => {
  const { handleTitleChange, handleContentChange, title, content } =
    useArticleForm(article?.title || '', article?.content || '');

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const articleData = { title, content };
      const success = await onSubmit(articleData);

      if (success) {
        if (isEditing) {
          setSuccessMessage('Article updated successfully');
        } else {
          setSuccessMessage('Article created successfully');
        }
      } else {
        setSuccessMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setSuccessMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      return 'Loading...';
    }
    if (isEditing) {
      return 'Update';
    }
    return 'Submit';
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        value={title}
        onChange={handleTitleChange}
        label={isEditing ? 'Article title' : 'New article title'}
        fullWidth
        sx={{ mt: 1 }}
        variant="filled"
      />
      <TextField
        name="content"
        value={content}
        onChange={handleContentChange}
        label={isEditing ? 'Article content' : 'New article content'}
        fullWidth
        sx={{ mt: 1 }}
        variant="filled"
      />
      <Button
        type="submit"
        sx={{ mt: 1 }}
        variant="outlined"
        disabled={isLoading}
      >
        {getButtonText()}
      </Button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};
