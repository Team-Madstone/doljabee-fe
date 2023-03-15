import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { createComment } from '../services/comment';
import { getFeed } from '../services/feed';
import { TComment, TCommentForm } from '../types/comment';
import { TError } from '../types/feed';
import Comment from './Comment';
import styles from '../styles/components/commentForm.module.scss';

type TProps = {
  comments: TComment[];
};

export default function CommentForm({ comments }: TProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const _id = params.id as string;

  const {
    register: createCommentRegister,
    formState: { errors: createCommentErrors },
    handleSubmit: createCommentHandleSubmit,
    setValue: createCommentSetValue,
  } = useForm<TCommentForm>();

  const { data } = useQuery(['getFeed', _id], () => getFeed({ _id }));

  const { mutate: createCommentMutation } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getFeed', _id]);
      createCommentSetValue('text', '');
    },
    onError: (error: TError) => {
      if (error.response.status === 401) {
        alert('로그인 후 이용해주세요.');
      }
    },
  });

  const onValid: SubmitHandler<TCommentForm> = ({ text }) => {
    if (!text.trim()) {
      return;
    }
    createCommentMutation({ _id, text });
  };

  return (
    <div>
      <form
        method="POST"
        onSubmit={createCommentHandleSubmit(onValid)}
        className={styles.form}
      >
        <input
          type="text"
          {...createCommentRegister('text')}
          placeholder="댓글 작성하기"
          className={styles.input}
        />
        <button className={styles.button} type="submit">
          댓글 달기
        </button>
        {createCommentErrors?.text && (
          <p className={styles.errorMsg}>{createCommentErrors.text?.message}</p>
        )}
      </form>
      <div>
        {data?.data.comments.map((comment: TComment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
