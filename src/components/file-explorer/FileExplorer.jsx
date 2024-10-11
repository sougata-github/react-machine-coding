import List from "./List";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FilePlus2, FolderPlus } from "lucide-react";
import { FileProvider, useFileContext } from "./FileContext";

const Root = () => {
  const { add } = useFileContext();
  const [itemName, setItemName] = useState("");

  const handleAdd = (type) => {
    if (itemName.trim() === "") return;

    const item = {
      id: uuidv4(),
      parentId: null,
      name: itemName,
      isFolder: type === "folder" ? true : false,
    };

    add(item);
    setItemName("");
  };

  return (
    <div className="w-72 py-2 bg-gray-100 rounded flex justify-between items-center px-2">
      <input
        className="text-gray-500 rounded outline-1 outline-gray-200 text-sm px-2 py-1 font-medium"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      {/* buttons */}
      <div className="flex items-center gap-2">
        <button onClick={() => handleAdd("file")}>
          <FilePlus2 className="text-gray-400 size-4 hover:text-gray-500 transition duration-300" />
        </button>
        <button onClick={() => handleAdd("folder")}>
          <FolderPlus className="text-gray-400 size-4 hover:text-gray-500 transition duration-300" />
        </button>
      </div>
    </div>
  );
};

const FileExplorer = () => {
  return (
    <FileProvider>
      <div className="py-2 h-[400px] overflow-y-auto overflow-x-clip w-80 pr-4">
        <Root />

        <div className="mt-4">
          <List />
        </div>
      </div>
    </FileProvider>
  );
};

export default FileExplorer;
