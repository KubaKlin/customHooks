import { Box, Modal, Typography } from '@mui/material';
import { NewArticleForm } from '../NewArticleForm/NewArticleForm';

export const ArticleModal = ({ open, onClose, isEditing, article }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="article-modal-title"
      aria-describedby="article-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="article-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          {isEditing ? 'Edit article' : 'Add new article'}
        </Typography>
        <NewArticleForm
          article={article}
          isEditing={isEditing}
          onClose={onClose}
        />
      </Box>
    </Modal>
  );
};
