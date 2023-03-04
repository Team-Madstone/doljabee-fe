import { TComment, TEditCommentForm } from '../types/comment';
import { HiOutlineX, HiPencil } from 'react-icons/hi';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment, updateComment } from '../services/comment';
import { useParams } from 'react-router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';

type TProps = {
  comment: TComment;
};

export default function Comment({ comment }: TProps) {
  const { user } = useContext(UserContext);
  const params = useParams();
  const _id = params.id as string;
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [chosenCommentId, setChosenCommentId] = useState<string>('');

  const { register, handleSubmit, setValue } = useForm<TEditCommentForm>();

  const { mutate: deleteCommentMutation } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getFeed', _id]);
    },
  });

  const { mutate: editCommentMutation } = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getFeed', _id]);
    },
  });

  const onValid: SubmitHandler<TEditCommentForm> = ({ editComment }) => {
    if (!editComment.trim()) {
      return;
    }

    editCommentMutation({ editComment, chosenCommentId });
    setIsEdit(false);
  };

  const onCancelClick = () => {
    setIsEdit(false);
  };

  const onDeleteClick = (_id: string) => {
    deleteCommentMutation({ _id });
  };

  const onEditClick = (_id: string) => {
    setIsEdit(true);
    setChosenCommentId(_id);
    setValue('editComment', comment.text);
  };

  return (
    <div key={comment._id}>
      <div>
        <span>{comment.username}</span>
        <span>{comment.createdAt}</span>
      </div>
      <div>
        {isEdit && comment._id === chosenCommentId ? (
          <form method="POST" onSubmit={handleSubmit(onValid)}>
            <input type="text" {...register('editComment')} />
            <button type="submit">수정</button>
            <button onClick={onCancelClick}>취소</button>
          </form>
        ) : (
          <p>{comment.text}</p>
        )}
      </div>
      {comment.user === user?._id && (
        <div>
          <button onClick={() => onDeleteClick(comment._id)}>
            <HiOutlineX size="20" />
          </button>
          <button onClick={() => onEditClick(comment._id)}>
            <HiPencil size="20" />
          </button>
        </div>
      )}
      <hr />
    </div>
  );
}
