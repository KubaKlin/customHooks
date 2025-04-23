import { Button, Box, IconButton } from '@mui/material';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ArticleModal } from '../ArticleModal/ArticleModal';
import useArticles from '../../hooks/useArticles';

export const ArticleEdit = ({ article, isFavorite, onToggleFavorite }) => {
  const [open, setOpen] = useState(false);
  const { deleteArticle } = useArticles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = () => {
    deleteArticle(article.id);
  };

  return (
    <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        aria-label="Edit article"
        size="small"
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleRemove}
        aria-label="Remove article"
      >
        Remove
      </Button>
      <IconButton
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        color={isFavorite ? 'primary' : 'default'}
        size="small"
      >
        {isFavorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
      <ArticleModal
        open={open}
        onClose={handleClose}
        isEditing={true}
        article={article}
      />
    </Box>
  );
};
