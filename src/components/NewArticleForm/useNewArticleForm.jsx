import { useState, useEffect } from 'react';

export function useNewArticleForm(initialTitle = '', initialContent = '') {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  // Update form values when initial values change
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

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
