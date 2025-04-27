import { Button } from '@mui/material';

const SortButton = ({ isSorted, onToggleSort }) => {
  return (
    <Button
      size="small"
      variant="outlined"
      sx={{ mb: 2 }}
      onClick={onToggleSort}
      color={isSorted ? 'primary' : 'inherit'}
    >
      {isSorted ? 'Sorted ascending' : 'Sort by length'}
    </Button>
  );
};

export { SortButton };
