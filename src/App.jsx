import { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { ArticleModal } from './components/ArticleModal/ArticleModal';
import { SortButton } from './components/SortButton/SortButton';
import useLocalStorage from './hooks/useLocalStorage';
import useArticles from './hooks/useArticles';
import useArticleEdit from './hooks/useArticleEdit';
import useArticleCreate from './hooks/useArticleCreate';
import useSearchQuery from './hooks/useSearchQuery';

const App = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [isSorted, setIsSorted] = useState(false);
  const [favoriteArticles, setFavoriteArticles] = useLocalStorage(
    'favoriteArticles',
    [],
  );

  const { articles, refreshArticles } = useArticles(isSorted, searchQuery);
  const {
    open: editOpen,
    editingArticle,
    handleOpen: handleEditOpen,
    handleClose: handleEditClose,
  } = useArticleEdit();
  const {
    open: createOpen,
    handleOpen: handleCreateOpen,
    handleClose: handleCreateClose,
  } = useArticleCreate();

  const handleToggleFavorite = (articleId) => {
    setFavoriteArticles((previous) => {
      if (previous.includes(articleId)) {
        return previous.filter((id) => id !== articleId);
      }
      return [...previous, articleId];
    });
  };

  const handleToggleSort = () => {
    setIsSorted((previousArticle) => !previousArticle);
  };

  const isModalOpen = editOpen || createOpen;
  const currentArticle = editingArticle;
  const isEditing = !!currentArticle;

  const handleModalClose = () => {
    if (isEditing) {
      handleEditClose();
    } else {
      handleCreateClose();
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Articles list
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={handleCreateOpen}
            >
              Add new article
            </Button>
            <SortButton isSorted={isSorted} onToggleSort={handleToggleSort} />
          </Box>
          <ArticleModal
            open={isModalOpen}
            onClose={handleModalClose}
            isEditing={isEditing}
            article={currentArticle}
            refreshArticles={refreshArticles}
          />
        </Box>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ArticlesList
          articles={articles}
          favoriteArticles={favoriteArticles}
          onToggleFavorite={handleToggleFavorite}
          onEdit={handleEditOpen}
          refreshArticles={refreshArticles}
        />
      </Box>
    </Container>
  );
};

export default App;
