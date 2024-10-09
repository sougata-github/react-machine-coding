import Item from "./Item";
import { useState } from "react";
import { useFileContext } from "./FileContext";
import { AnimatePresence, motion } from "framer-motion";

/* eslint-disable react/prop-types */
const List = ({ parentId, level = 0 }) => {
  const [expanded, setExpanded] = useState({});

  const handleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const { items } = useFileContext();

  const filteredItems = parentId
    ? items.filter((item) => item.parentId === parentId)
    : items.filter((item) => item.parentId === null);

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col pl-1"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          ease: "easeIn",
          duration: 0.5,
        }}
        exit={{
          opacity: 0,
        }}
      >
        {filteredItems.length === 0 && (
          <div
            style={{
              paddingLeft: level ? `${level * 12 + 12}px` : undefined,
            }}
          >
            <p className="font-medium text-sm text-gray-400">
              {level === 0 ? "No files or folders" : ""}
            </p>
          </div>
        )}

        {filteredItems.length > 0 &&
          filteredItems.map((item) => (
            <div className="flex flex-col" key={item.id}>
              <Item
                id={item.id}
                level={level}
                name={item.name}
                isFolder={item.isFolder}
                expanded={expanded[item.id]}
                handleExpand={() => handleExpand(item.id)}
              />
              {expanded[item.id] && (
                <List parentId={item.id} level={level + 1} />
              )}
            </div>
          ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default List;
