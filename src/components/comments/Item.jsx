import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Send } from "lucide-react";
import { useCommentContext } from "./CommentContext";

/* eslint-disable react/prop-types */
const Item = ({ id, expanded, handleExpand, level, content }) => {
  const [reply, setReply] = useState();
  const [isReply, setIsReply] = useState(false);

  const { addComment } = useCommentContext();

  const onExpand = (event) => {
    event.stopPropagation();
    handleExpand();
    setIsReply(false);
  };

  const handleReply = () => {
    const newReply = {
      id: uuidv4(),
      content: reply,
      parentId: id,
    };

    addComment(newReply);

    setReply("");
    setIsReply(false);

    if (!expanded) {
      handleExpand();
    }
  };

  return (
    <div
      className="border-b-[0.5px] border-gray-300 flex flex-col gap-4 items-start py-4"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : undefined,
      }}
    >
      <p
        style={{
          fontSize: `${level > 0 ? "12px" : "18px"}`,
        }}
      >
        {content}
      </p>

      <div className="flex gap-2 items-center justify-start">
        <button
          onClick={onExpand}
          className="text-sm text-gray-400 flex items-center gap-1"
        >
          View replies
        </button>

        {/* Reply Button */}
        <button
          className="text-sm text-gray-400"
          onClick={() => {
            setIsReply((prev) => !prev);
          }}
        >
          Reply
        </button>
      </div>
      {isReply && (
        <div className="gap-1 flex items-center py-1">
          <input
            className="text-sm p-1 border-none focus:outline-none active:outline-none border-b border-gray-400 border-[0.5px]"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Reply"
          />
          <button onClick={handleReply}>
            <Send className="h-3 w-3 text-gray-400 rotate-45" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;
