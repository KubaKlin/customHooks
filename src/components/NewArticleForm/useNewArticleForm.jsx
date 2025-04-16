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

  const setInitialValues = (initialTitle, initialContent) => {
    setTitle(initialTitle);
    setContent(initialContent);
  };

  return {
    handleTitleChange,
    handleContentChange,
    title,
    content,
    setInitialValues,
  };
}
