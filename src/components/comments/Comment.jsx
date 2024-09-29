import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Send } from "lucide-react";

import CommentList from "./CommentList";
import { CommentProvider, useCommentContext } from "./CommentContext.jsx";

const CommentBox = () => {
  const [content, setContent] = useState("");

  const { addComment } = useCommentContext();

  const handleAddComment = () => {
    if (content === "") return;

    let comment = {
      id: uuidv4(),
      content,
      parentId: null,
    };

    addComment(comment);

    setContent("");
  };

  return (
    <div className="border-[0.5px] border-gray-200 py-2 px-6 rounded-lg flex gap-2 items-center justify-between">
      <input
        type="text"
        value={content}
        placeholder="Add a comment"
        onChange={(e) => setContent(e.target.value)}
        className="border-none focus:outline-none active:outline-none"
      />
      <button
        onClick={handleAddComment}
        className="p-4 hover:bg-gray-100 transition-all duration-500 rounded-full"
      >
        <Send className="h-4 w-4 text-gray-400 rotate-45" />
      </button>
    </div>
  );
};

const Comment = () => {
  return (
    <CommentProvider>
      <div className="flex flex-col items-center p-4 gap-8">
        {/* Comment Box */}
        <CommentBox />
        <div className="h-[400px] w-full overflow-y-scroll">
          <CommentList />
        </div>
      </div>
    </CommentProvider>
  );
};

export default Comment;
