import { useNewArticleForm } from './useNewArticleForm';
import { useNewArticleCreating } from './useNewArticleCreating';
import { TextField, Button } from '@mui/material';

export const NewArticleForm = () => {
  const { handleTitleChange, handleContentChange, title, content } = useNewArticleForm();

  const { handleSubmit, isLoading, successMessage } = useNewArticleCreating(
    title,
    content,
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        value={title}
        onChange={handleTitleChange}
        label="New article title"
        fullWidth
        sx={{ mt: 1 }}
        variant={'filled'}
      />
      <TextField
        name="content"
        value={content}
        onChange={handleContentChange}
        label="New article content"
        fullWidth
        sx={{ mt: 1 }}
        variant={'filled'}
      />
      <Button type="submit" sx={{ mt: 1 }} variant={ 'outlined' } disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  )
}