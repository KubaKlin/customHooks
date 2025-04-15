import { useState } from 'react';

export function useNewArticleForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return {
    handleTitleChange,
    handleContentChange,
    title,
    content,
  };

}