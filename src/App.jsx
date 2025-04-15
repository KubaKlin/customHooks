import { useEffect, useState, useMemo } from 'react';
import { Container, Box, Typography, Button, Modal } from '@mui/material';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ArticlesList } from './components/ArticlesList/ArticlesList.jsx';
import { NewArticleForm } from "./components/NewArticleForm/NewArticleForm.jsx";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesResponse] =
          await Promise.all([
            fetch('http://localhost:3000/articles'),
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
    return articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.content.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [articles, searchQuery]);

  const [open, setOpen] = useState(false);
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
    <Container maxWidth={ 'md' }>
      <Box sx={{ my: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Articles list
          </Typography>
          <Button variant={ 'outlined' } onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add new article
              </Typography>
              <NewArticleForm/>
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
