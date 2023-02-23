import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import Nav from '../components/Nav';
import { resetPassword } from '../services/user';
import { TResetPassword } from '../types/user';

export default function ResetPassword() {
  const location = useLocation();
  const email = location.search.split('=')[1].split('&')[0];

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<TResetPassword>();

  const onValid: SubmitHandler<TResetPassword> = async ({
    newPassword,
    newPasswordConfirmation,
  }) => {
    resetPassword({
      email,
      newPassword,
      newPasswordConfirmation,
    });
  };

  return (
    <div>
      <Nav />
      <h1>Reset Password</h1>
      <form method="POST" onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="password">새로운 비밀번호 </label>
          <input
            id="password"
            type="password"
            {...register('newPassword', {
              required: '비밀번호는 필수입니다.',
              minLength: {
                value: 6,
                message: '6글자 이상 작성해주세요.',
              },
              maxLength: {
                value: 20,
                message: '20글자 이하로 작성해주세요.',
              },
            })}
          />
          {formErrors?.newPassword && (
            <p className="error">{formErrors.newPassword?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">새로운 비밀번호 확인 </label>
          <input
            id="password"
            type="password"
            {...register('newPasswordConfirmation', {
              required: '비밀번호는 필수입니다.',
              minLength: {
                value: 6,
                message: '6글자 이상 작성해주세요.',
              },
              maxLength: {
                value: 20,
                message: '20글자 이하로 작성해주세요.',
              },
            })}
          />
          {formErrors?.newPasswordConfirmation && (
            <p className="error">
              {formErrors.newPasswordConfirmation?.message}
            </p>
          )}
        </div>
        <button type="submit">변경하기</button>
      </form>
    </div>
  );
}
