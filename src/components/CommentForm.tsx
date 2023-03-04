import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { createComment } from '../services/comment';
import { TCommentForm } from '../types/comment';
import { TError } from '../types/feed';

export default function CommentForm() {
  const queryClient = useQueryClient();
  const params = useParams();
  const _id = params.id as string;

  const {
    register: createCommentRegister,
    formState: { errors: createCommentErrors },
    handleSubmit: createCommentHandleSubmit,
    setValue: createCommentSetValue,
  } = useForm<TCommentForm>();

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
      <form method="POST" onSubmit={createCommentHandleSubmit(onValid)}>
        <input
          type="text"
          {...createCommentRegister('text')}
          placeholder="댓글 작성하기"
        />
        {createCommentErrors?.text && (
          <p className="error">{createCommentErrors.text?.message}</p>
        )}
        <button type="submit">댓글 달기</button>
      </form>
    </div>
  );
}
