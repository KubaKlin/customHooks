import { Button } from '@mui/material';

const SortButton = ({ sortOrder, onSortChange }) => {
  const getSortButtonText = () => {
    switch (sortOrder) {
      case 'ascending':
        return 'Sort by length (ascending)';
      case 'descending':
        return 'Sort by length (descending)';
      default:
        return 'Sort by length';
    }
  };

  const handleSortArticles = () => {
    onSortChange((current) => {
      if (current === 'none') return 'ascending';
      if (current === 'ascending') return 'descending';
      return 'none';
    });
  };

  return (
    <Button
      size="small"
      variant={'outlined'}
      sx={{ mb: 2 }}
      onClick={handleSortArticles}
      color={sortOrder !== 'none' ? 'primary' : 'inherit'}
    >
      {getSortButtonText()}
    </Button>
  );
};

export { SortButton };
