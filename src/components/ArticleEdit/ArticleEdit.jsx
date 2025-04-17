import { Button, Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { NewArticleForm } from '../NewArticleForm/NewArticleForm';

export const ArticleEdit = ({ article }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = async () => {
    try {
      await fetch(`http://localhost:3010/articles/${article.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error removing article:', error);
    }
  };

  return (
    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="edit-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Edit article
          </Typography>
          <NewArticleForm
            article={article}
            isEditing={true}
            onClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};
