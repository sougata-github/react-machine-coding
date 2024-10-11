import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

/* eslint-disable react/prop-types */
const Input = ({
  type,
  handleAdd,
  isAddingItem,
  setIsAddingItem,
  itemName,
  setItemName,
}) => {
  const inputRef = useRef(null);

  const handleClose = () => {
    setIsAddingItem(false);
  };

  const elementRef = useOutsideClick(handleClose);

  useEffect(() => {
    if (isAddingItem) {
      inputRef.current.focus();
    }
  }, [isAddingItem]);

  return (
    <div className="w-full flex justify-between" ref={elementRef}>
      <input
        ref={inputRef}
        className="ml-1 rounded outline-1 outline-gray-200 text-sm px-2 py-1 border border-black/10 text-gray-400 font-medium"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <button onClick={() => handleAdd(type)}>
        <Plus className="size-4 text-gray-500" />
      </button>
    </div>
  );
};

export default Input;
