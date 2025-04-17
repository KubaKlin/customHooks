import { useEffect, useState, useMemo } from 'react';
import { Container, Box, Typography, Button, Modal } from '@mui/material';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { NewArticleForm } from './components/NewArticleForm/NewArticleForm';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'ascendant', 'descending'

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

  const filteredAndSortedArticles = useMemo(() => {
    let result = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortOrder !== 'none') {
      result = [...result].sort((a, b) => {
        const lengthA = a.content.length;
        const lengthB = b.content.length;
        return sortOrder === 'ascendant' ? lengthA - lengthB : lengthB - lengthA;
      });
    }

    return result;
  }, [articles, searchQuery, sortOrder]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSortArticles = () => {
    setSortOrder((current) => {
      if (current === 'none') return 'ascendant';
      if (current === 'ascendant') return 'descending';
      return 'none';
    });
  };

  const getSortButtonText = () => {
    switch (sortOrder) {
      case 'ascendant':
        return 'Sort by length (ascending)';
      case 'descending':
        return 'Sort by length (descending)';
      default:
        return 'Sort by length';
    }
  };

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
            <Button
              size="small"
              variant={'outlined'}
              sx={{ mb: 2 }}
              onClick={handleSortArticles}
              color={sortOrder !== 'none' ? 'primary' : 'inherit'}
            >
              {getSortButtonText()}
            </Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-modal-title"
            aria-describedby="add-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="add-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 2 }}
              >
                Add new article
              </Typography>
              <NewArticleForm isEditing={false} onClose={handleClose} />
            </Box>
          </Modal>
        </Box>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ArticlesList articles={filteredAndSortedArticles} />
      </Box>
    </Container>
  );
};

export default App;
