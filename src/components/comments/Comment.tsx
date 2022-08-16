import { CommentBase } from '@/types/entities';

interface Props {
  comment: CommentBase;
}

export const Comment = ({ comment }: Props) => {
  return (
    <div key={comment._id} className="px-4 flex flex-row">
      <div className="flex flex-row">
        {Array(comment.depth)
          .fill(1)
          .map((val, index) => (
            <div key={index} className="border-l-2 px-2 h-full"></div>
          ))}
      </div>
      <p className="py-4">{comment.content}</p>
    </div>
  );
};
