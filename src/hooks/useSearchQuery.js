import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSearchQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );

  const settingSearchQuery = (value) => {
    setSearchQuery(value);
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  return [searchQuery, settingSearchQuery];
};

export default useSearchQuery;
