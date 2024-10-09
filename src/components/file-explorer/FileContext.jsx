/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const FileContext = createContext(null);

export const FileProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const result = JSON.parse(localStorage.getItem("items"));

    return result ? result : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function add(item) {
    setItems((prev) => [...prev, item]);
  }

  return (
    <FileContext.Provider value={{ items, add }}>
      {children}
    </FileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFileContext = () => {
  const context = useContext(FileContext);
  return context;
};
