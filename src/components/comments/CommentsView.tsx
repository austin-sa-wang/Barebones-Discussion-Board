import { Comment as IComment } from '@/types/entities';
import { Comment } from './Comment';

interface Props {
  comments: IComment[];
}

export function CommentsView({ comments }: Props) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
