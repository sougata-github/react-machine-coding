import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* eslint-disable react/prop-types */
const DropDown = ({ list, loading, error, activeIndex }) => {
  const itemRefs = useRef([]);

  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching names ☹️</p>;
  if (!loading && list.length === 0) return <p>No names found</p>;

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
          {list.map((character, index) => (
            <li
              ref={(el) => (itemRefs.current[index] = el)}
              key={character.url}
              className={`p-5 w-full border-b border-black/20 last:border-none ${
                activeIndex === index ? "bg-gray-200" : ""
              }`}
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
