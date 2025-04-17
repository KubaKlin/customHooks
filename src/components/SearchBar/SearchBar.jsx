import { TextField, Box } from '@mui/material';

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ pt: 2, px: 2, background: '#efefef' }}>
      <TextField
        fullWidth
        label="Search articles by title or content"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ background: '#fff' }}
      />
    </Box>
  );
};
