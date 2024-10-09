import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFileContext } from "./FileContext";
import { File, Folder, FolderOpen } from "lucide-react";
import { ChevronRight, FilePlus2, FolderPlus, Plus } from "lucide-react";

/* eslint-disable react/prop-types */
const Item = ({ level, expanded, handleExpand, name, id, isFolder }) => {
  const icon = isFolder ? (
    expanded ? (
      <FolderOpen className="size-5 text-gray-500 transition" />
    ) : (
      <Folder className="size-5 text-gray-500 transition" />
    )
  ) : (
    <File className="size-5 text-gray-500 transition" />
  );

  const { add } = useFileContext();
  const inputRef = useRef(null);
  const [itemName, setItemName] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  useEffect(() => {
    if (isAddingItem) {
      inputRef.current.focus();
    }
  }, [isAddingItem]);

  useEffect(() => {
    if (!expanded) {
      setIsAddingItem(false);
    }
  }, [expanded]);

  const onExpand = (e) => {
    e.stopPropagation();
    handleExpand();
  };

  const handleAdd = (type) => {
    if (itemName.trim() === "") return;

    const item = {
      id: uuidv4(),
      parentId: id,
      name: itemName,
      isFolder: type === "folder" ? true : false,
    };

    add(item);
    setItemName("");
    setIsAddingItem(false);

    if (!expanded) {
      handleExpand();
    }
  };

  return (
    <div
      className="flex flex-col py-2"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : undefined,
      }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          {isFolder && (
            <ChevronRight
              onClick={onExpand}
              className="cursor-pointer size-5 text-gray-500 transition duration-500"
              style={{
                transform: `${expanded ? "rotate(90deg)" : "rotate(0deg)"}`,
              }}
            />
          )}

          {icon}
          <p className="text-sm text-gray-500 font-medium">{name}</p>
        </div>

        {isFolder && (
          <div>
            <button
              onClick={() => {
                setIsAddingItem((prev) => !prev);
                if (!expanded) {
                  handleExpand();
                }
              }}
            >
              <Plus className="size-5 text-gray-500" />
            </button>
          </div>
        )}
      </div>

      {isAddingItem && (
        <div
          className="mt-2 flex justify-between"
          style={{
            paddingLeft: level ? `${level * 12 + 12}px` : undefined,
          }}
        >
          <input
            ref={inputRef}
            className="rounded outline-1 outline-gray-200 text-sm px-2 py-1 border border-black/10 text-gray-500"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleAdd("file")}
              disabled={itemName === ""}
            >
              <FilePlus2 className="text-gray-400 size-4 hover:text-gray-500 transition duration-300" />
            </button>
            <button
              onClick={() => handleAdd("folder")}
              disabled={itemName === ""}
            >
              <FolderPlus className="text-gray-400 size-4 hover:text-gray-500 transition duration-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
