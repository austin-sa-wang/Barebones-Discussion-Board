import { Comment } from '@/types/entities';
import { useContext, useState } from 'react';
import { ThreadContext } from '../ThreadContext';

interface Props {
  comment: Comment;
}

export const Comment = ({ comment }: Props) => {
  const [isShowingReplyBox, setIsShowingReplyBox] = useState(false);
  const toggleReplyBox = () => setIsShowingReplyBox(!isShowingReplyBox);

  const threadContext = useContext(ThreadContext);

  const [commentContent, setCommentContent] = useState(``);
  const [loading] = useState(false);

  const createComment = async () => {
    await threadContext.replyToComment(comment._id, commentContent);
    setIsShowingReplyBox(false);
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
      <div className="py-4">
        <p className="text-slate-400 text-xs">{comment.userAccount}</p>
        <p>{comment.content}</p>
        <p className="text-xs text-slate-400">{comment.createdAt}</p>
        <button
          onClick={() => toggleReplyBox()}
          className="p-1 text-xs text-slate-600"
          disabled={loading}
        >
          Add Comment
        </button>
        {isShowingReplyBox ? (
          <div className="mt-4">
            <textarea
              className="border p-4 min-w-full h-24"
              value={commentContent}
              onChange={(change) => setCommentContent(change.target.value)}
              autoFocus
            ></textarea>
            <button
              onClick={() => createComment()}
              className="p-2 font-semibold text-sm bg-cyan-500 hover:bg-sky-700 text-white rounded-md shadow-sm"
              disabled={loading}
            >
              {loading ? `Saving...` : `Add Comment`}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
