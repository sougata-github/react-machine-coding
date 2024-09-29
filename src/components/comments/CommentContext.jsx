import { createContext, useContext, useState, useEffect } from "react";

const CommentContext = createContext();

// eslint-disable-next-line react/prop-types
export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState(() => {
    const result = JSON.parse(localStorage.getItem("comments"));
    return result ? result : [];
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const addComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  return (
    <CommentContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCommentContext = () => {
  const context = useContext(CommentContext);

  return context;
};
