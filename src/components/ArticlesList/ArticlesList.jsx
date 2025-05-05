import { List, ListItem, Typography, Box } from '@mui/material';
import { ArticleEdit } from '../ArticleEdit/ArticleEdit';

export const ArticlesList = ({
  articles,
  favoriteArticles,
  onToggleFavorite,
  refreshArticles,
}) => {
  return (
    <List sx={{ background: '#efefef' }}>
      {articles.map((article) => (
        <ListItem key={article.id} sx={{ display: 'block' }}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h6" component="div">
              {article.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.content}
            </Typography>
            <ArticleEdit
              article={article}
              isFavorite={favoriteArticles.includes(article.id)}
              onToggleFavorite={() => onToggleFavorite(article.id)}
              refreshArticles={refreshArticles}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
