import { useEffect, useState, useMemo } from 'react';
import { Container, Box, Typography, Button, Modal } from '@mui/material';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { NewArticleForm } from './components/NewArticleForm/NewArticleForm';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

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

  const filteredArticles = useMemo(() => {
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [articles, searchQuery]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Typography variant="h4" sx={{ mb: 4 }}>
            Articles list
          </Typography>
          <Button variant={'outlined'} onClick={handleOpen}>
            Add new article
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-modal-title"
            aria-describedby="add-modal-description"
          >
            <Box sx={style}>
              <Typography id="add-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                Add new article
              </Typography>
              <NewArticleForm isEditing={false} onClose={handleClose} />
            </Box>
          </Modal>
        </Box>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ArticlesList articles={filteredArticles} />
      </Box>
    </Container>
  );
};

export default App;
