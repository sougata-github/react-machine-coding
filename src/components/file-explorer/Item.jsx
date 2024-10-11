import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import { useFileContext } from "./FileContext";
import { useEffect, useState } from "react";
import { File, Folder, FolderOpen } from "lucide-react";
import { ChevronRight, FilePlus2, FolderPlus } from "lucide-react";

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
  const [type, setType] = useState("");
  const [itemName, setItemName] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

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
      className="w-72 rounded group cursor-pointer flex flex-col py-2 relative pr-2"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "",
      }}
    >
      <div
        className="rounded hover:bg-black/5 absolute inset-0 hover:opacity-100 transition duration-300"
        style={{
          left: level ? `${level * 12 + 8}px` : "-2px",
        }}
      />
      <div className="flex justify-between">
        <div className="flex gap-2">
          {isFolder && (
            <ChevronRight
              onClick={onExpand}
              className="cursor-pointer size-5 text-gray-500 transition duration-300"
              style={{
                transform: `${expanded ? "rotate(90deg)" : "rotate(0deg)"}`,
              }}
            />
          )}

          {icon}
          <p className="text-sm text-gray-500 font-medium">{name}</p>
        </div>

        {isFolder && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300 relative z-20">
            <button
              onClick={() => {
                setIsAddingItem((prev) => !prev);
                setType("file");
                if (!expanded) {
                  handleExpand();
                }
              }}
            >
              <FilePlus2 className="text-gray-400 size-4" />
            </button>
            <button
              onClick={() => {
                setIsAddingItem((prev) => !prev);
                setType("folder");
                if (!expanded) {
                  handleExpand();
                }
              }}
            >
              <FolderPlus className="text-gray-400 size-4" />
            </button>
          </div>
        )}
      </div>

      {isAddingItem && (
        <div
          className="relative z-20 mt-2 flex justify-between"
          style={{
            paddingLeft: level ? `${level * 12 + 12}px` : undefined,
          }}
        >
          <Input
            type={type}
            handleAdd={handleAdd}
            isAddingItem={isAddingItem}
            setIsAddingItem={setIsAddingItem}
            itemName={itemName}
            setItemName={setItemName}
          />
        </div>
      )}
    </div>
  );
};

export default Item;
