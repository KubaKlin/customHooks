import { useArticleForm } from './useArticleForm.jsx';
import { TextField, Button } from '@mui/material';
import React from 'react';

export const ArticleForm = ({ article, isEditing, onSubmit }) => {
  const { handleTitleChange, handleContentChange, title, content } =
    useArticleForm(article?.title || '', article?.content || '');

  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const articleData = { title, content };
      const success = await onSubmit(articleData);

      if (success) {
        setSuccessMessage(
          isEditing
            ? 'Article updated successfully'
            : 'Article created successfully',
        );
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
        {isLoading ? 'Loading...' : isEditing ? 'Update' : 'Submit'}
      </Button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};
