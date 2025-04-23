import { useEffect, useState, useMemo } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { ArticleModal } from './components/ArticleModal/ArticleModal';
import { SortButton } from './components/SortButton/SortButton';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'ascending', 'descending'
  const [favoriteArticles, setFavoriteArticles] = useLocalStorage('favoriteArticles', []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesResponse] = await Promise.all([
          fetch('http://localhost:3010/articles'),
        ]);
        const articlesData = await articlesResponse.json();
        setArticles(articlesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [articles]);

  const handleToggleFavorite = (articleId) => {
    setFavoriteArticles((previous) => {
      if (previous.includes(articleId)) {
        return previous.filter((id) => id !== articleId);
      }
      return [...previous, articleId];
    });
  };

  const filteredAndSortedArticles = useMemo(() => {
    let result = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortOrder !== 'none') {
      result = [...result].sort((firstArticle, secondArticle) => {
        const firstArticleLength = firstArticle.content.length;
        const secondArticleLength = secondArticle.content.length;
        return sortOrder === 'ascending'
          ? firstArticleLength - secondArticleLength
          : secondArticleLength - firstArticleLength;
      });
    }

    return result;
  }, [articles, searchQuery, sortOrder]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <SortButton sortOrder={sortOrder} onSortChange={setSortOrder} />
          </Box>
          <ArticleModal open={open} onClose={handleClose} isEditing={false} />
        </Box>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ArticlesList
          articles={filteredAndSortedArticles}
          favoriteArticles={favoriteArticles}
          onToggleFavorite={handleToggleFavorite}
        />
      </Box>
    </Container>
  );
};

export default App;
