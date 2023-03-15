import { TComment, TEditCommentForm } from '../types/comment';
import { HiOutlineX, HiPencil } from 'react-icons/hi';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment, updateComment } from '../services/comment';
import { useParams } from 'react-router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import styles from '../styles/components/comment.module.scss';

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
      <div className={styles.comment}>
        <span className={styles.username}>{comment.username} &nbsp;</span>
        <span className={styles.createdAt}>{comment.createdAt}</span>
      </div>
      <div>
        {isEdit && comment._id === chosenCommentId ? (
          <form
            method="POST"
            onSubmit={handleSubmit(onValid)}
            className={styles.form}
          >
            <input
              type="text"
              {...register('editComment')}
              className={styles.input}
            />
            <button className={styles.btn} type="submit">
              수정
            </button>
            <button className={styles.delBtn} onClick={onCancelClick}>
              취소
            </button>
          </form>
        ) : (
          <p className={styles.text}>{comment.text}</p>
        )}
      </div>
      {comment.user === user?._id && (
        <div className={styles.btnWrapper}>
          <button
            className={styles.icon}
            onClick={() => onDeleteClick(comment._id)}
          >
            <HiOutlineX />
          </button>
          <button
            className={styles.icon}
            onClick={() => onEditClick(comment._id)}
          >
            <HiPencil />
          </button>
        </div>
      )}
    </div>
  );
}
