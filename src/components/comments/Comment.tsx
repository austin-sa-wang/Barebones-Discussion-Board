import { CommentForView } from '@/types/entities';

interface Props {
  comment: CommentForView;
}

export const Comment = ({ comment }: Props) => {
  return (
    <div
      key={comment._id}
      className="py-4 px-4 hover:shadow-inner cursor-pointer"
    >
      <h3>{comment.content}</h3>
    </div>
  );
};
