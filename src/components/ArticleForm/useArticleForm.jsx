import { useState } from 'react';

export function useArticleForm(initialTitle = '', initialContent = '') {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const resetForm = () => {
    setTitle(initialTitle);
    setContent(initialContent);
  };

  return {
    handleTitleChange,
    handleContentChange,
    resetForm,
    title,
    content,
  };
}
