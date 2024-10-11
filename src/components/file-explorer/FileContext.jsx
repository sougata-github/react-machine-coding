/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { isValidName } from "../../utils";

const FileContext = createContext(null);

export const FileProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const result = JSON.parse(localStorage.getItem("items"));

    return result ? result : [];
  });

  const [expanded, setExpanded] = useState(() => {
    const result = JSON.parse(localStorage.getItem("expanded"));

    return result ? result : {};
  });

  useEffect(() => {
    localStorage.setItem("expanded", JSON.stringify(expanded));
  }, [expanded]);

  const handleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function add(newItem) {
    const duplicate = items.some(
      (item) => item.name === newItem.name && item.parentId === newItem.parentId
    );

    if (duplicate) {
      alert("A file or folder with this name already exists!");
      return;
    }

    if (!isValidName(newItem.name, newItem.isFolder)) {
      alert("Invalid file or folder name!");
      return;
    }

    setItems((prev) => [...prev, newItem]);
  }

  return (
    <FileContext.Provider value={{ items, add, expanded, handleExpand }}>
      {children}
    </FileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFileContext = () => {
  const context = useContext(FileContext);
  return context;
};
