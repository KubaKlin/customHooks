import { useNewArticleForm } from './useNewArticleForm';
import { useNewArticleCreating } from './useNewArticleCreating';
import { TextField, Button } from '@mui/material';
import React from 'react';

export const NewArticleForm = ({ article, isEditing, onClose }) => {
  const {
    handleTitleChange,
    handleContentChange,
    title,
    content,
    setInitialValues,
  } = useNewArticleForm();

  // Set initial values when editing
  React.useEffect(() => {
    if (isEditing && article) {
      setInitialValues(article.title, article.content);
    }
  }, [isEditing, article, setInitialValues]);

  const { handleSubmit, isLoading, successMessage } = useNewArticleCreating(
    title,
    content,
    isEditing,
    article?.id,
    onClose,
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        value={title}
        onChange={handleTitleChange}
        label={isEditing ? 'Article title' : 'New article title'}
        fullWidth
        sx={{ mt: 1 }}
        variant={'filled'}
      />
      <TextField
        name="content"
        value={content}
        onChange={handleContentChange}
        label={isEditing ? 'Article content' : 'New article content'}
        fullWidth
        sx={{ mt: 1 }}
        variant={'filled'}
      />
      <Button
        type="submit"
        sx={{ mt: 1 }}
        variant={'outlined'}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : isEditing ? 'Update' : 'Submit'}
      </Button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};
