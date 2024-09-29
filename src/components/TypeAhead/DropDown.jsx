import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* eslint-disable react/prop-types */
const DropDown = ({
  list,
  error,
  loading,
  setData,
  setQuery,
  activeIndex,
  setActiveIndex,
}) => {
  const itemRefs = useRef([]);

  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  if (list === null) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching names ☹️</p>;
  if (!loading && list !== null && list.length === 0)
    return <p>No names found</p>;

  const handleClick = (index) => {
    setData(null);
    setActiveIndex(-1);
    setQuery(list[index].name);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="mt-2 text-left border border-black/10 rounded-lg max-h-[500px] overflow-y-auto"
        initial={{
          y: 5,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 100,
        }}
        exit={{
          y: 5,
          opacity: 0,
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.2,
        }}
      >
        <ul className="flex flex-col items-start">
          {list !== null &&
            list.map((character, index) => (
              <li
                ref={(el) => (itemRefs.current[index] = el)}
                key={character.url}
                className={`cursor-pointer p-5 w-full border-b border-black/20 last:border-none hover:bg-gray-200 transition duration-300 ${
                  activeIndex === index ? "bg-gray-200" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {character.name}
              </li>
            ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default DropDown;
