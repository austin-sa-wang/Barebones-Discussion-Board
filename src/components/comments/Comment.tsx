import { CommentBase } from '@/types/entities';
import { useState } from 'react';

interface Props {
  comment: CommentBase;
}

export const Comment = ({ comment }: Props) => {
  const [commentContent, setCommentContent] = useState(``);
  const [loading] = useState(false);

  const createComment = () => {
    console.log(`stub`);
  };

  return (
    <div key={comment._id} className="px-4 flex flex-row">
      <div className="flex flex-row">
        {Array(comment.depth)
          .fill(1)
          .map((val, index) => (
            <div key={index} className="border-l-2 px-2 h-full"></div>
          ))}
      </div>
      <div>
        <div className="mt-4">
          <p className="py-4">{comment.content}</p>

          <textarea
            className="border p-4 min-w-full h-24"
            value={commentContent}
            onChange={(change) => setCommentContent(change.target.value)}
          ></textarea>
          <button
            onClick={() => createComment()}
            className="p-2 font-semibold text-sm bg-cyan-500 hover:bg-sky-700 text-white rounded-md shadow-sm"
            disabled={loading}
          >
            {loading ? `Saving...` : `Add Comment`}
          </button>
        </div>
      </div>
    </div>
  );
};
