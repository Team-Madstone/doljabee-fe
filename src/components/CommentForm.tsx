import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { createComment } from '../services/comment';
import { TCommentForm } from '../types/comment';

export default function CommentForm() {
  const params = useParams();
  const _id = params.id as string;

  const {
    register: createCommentRegister,
    formState: { errors: createCommentErrors },
    handleSubmit: createCommentHandleSubmit,
  } = useForm<TCommentForm>();

  const onValid: SubmitHandler<TCommentForm> = ({ text }) => {
    if (!text.trim()) {
      return;
    }
    createComment({ _id, text });
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
