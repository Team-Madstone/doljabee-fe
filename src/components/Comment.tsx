import { TComment } from '../types/comment';
import { HiOutlineX, HiPencil } from 'react-icons/hi';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment } from '../services/comment';
import { useParams } from 'react-router';

type TProps = {
  comment: TComment;
};

export default function Comment({ comment }: TProps) {
  const params = useParams();
  const _id = params.id as string;
  const queryClient = useQueryClient();

  const { mutate: deleteCommentMutation } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getFeed', _id]);
    },
  });

  const onDeleteClick = (_id: string) => {
    deleteCommentMutation({ _id });
  };

  return (
    <div key={comment._id}>
      <div>
        <span>{comment.username}</span>
        <span>{comment.createdAt}</span>
      </div>
      <div>
        <p>{comment.text}</p>
      </div>
      <div>
        <button onClick={() => onDeleteClick(comment._id)}>
          <HiOutlineX size="20" />
        </button>
        <button>
          <HiPencil size="20" />
        </button>
      </div>

      <hr />
    </div>
  );
}
