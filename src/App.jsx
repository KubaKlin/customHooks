import { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { ArticleModal } from './components/ArticleModal/ArticleModal';
import { SortButton } from './components/SortButton/SortButton';
import useLocalStorage from './hooks/useLocalStorage';
import useArticles from './hooks/useArticles';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [favoriteArticles, setFavoriteArticles] = useLocalStorage('favoriteArticles', []);
  
  const { articles } = useArticles(isSorted);

  const handleToggleFavorite = (articleId) => {
    setFavoriteArticles((previous) => {
      if (previous.includes(articleId)) {
        return previous.filter((id) => id !== articleId);
      }
      return [...previous, articleId];
    });
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleToggleSort = () => setIsSorted(prev => !prev);

  return (
    <Container maxWidth={'md'}>
      <Box sx={{ my: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Articles list
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant={'outlined'}
              sx={{ mb: 2 }}
              onClick={handleOpen}
            >
              Add new article
            </Button>
            <SortButton 
              isSorted={isSorted}
              onToggleSort={handleToggleSort}
            />
          </Box>
          <ArticleModal open={open} onClose={handleClose} isEditing={false} />
        </Box>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ArticlesList
          articles={filteredArticles}
          favoriteArticles={favoriteArticles}
          onToggleFavorite={handleToggleFavorite}
        />
      </Box>
    </Container>
  );
};

export default App;
