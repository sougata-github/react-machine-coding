/* eslint-disable react/prop-types */
import { useState } from "react";

import Item from "./Item";
import { useCommentContext } from "./CommentContext";

const CommentList = ({ parentId, level = 0 }) => {
  const [expanded, setExpanded] = useState({});

  const { comments } = useCommentContext();

  const filteredComments = parentId
    ? comments.filter((comment) => comment.parentId === parentId)
    : comments.filter((comment) => comment.parentId === null);

  const handleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="py-2 flex flex-col gap-4 h-fit w-full overflow-y-auto overflow-x-hidden">
      {filteredComments.length === 0 && (
        <p
          style={{
            paddingLeft: level ? `${level * 12 + 12}px` : undefined,
          }}
          className="text-xs"
        >
          {level === 0 ? "No comments" : "No replies"}
        </p>
      )}

      {filteredComments.length > 0 &&
        filteredComments.map((comment) => (
          <div key={comment.id}>
            <Item
              id={comment.id}
              expanded={expanded[comment.id]}
              handleExpand={() => handleExpand(comment.id)}
              level={level}
              content={comment.content}
            />
            {expanded[comment.id] && (
              <CommentList parentId={comment.id} level={level + 1} />
            )}
          </div>
        ))}
    </div>
  );
};

export default CommentList;
