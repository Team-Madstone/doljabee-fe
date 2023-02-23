import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Nav from '../components/Nav';
import { changePassword } from '../services/user';
import { TChangePassword } from '../types/user';

export default function ChangePassword() {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<TChangePassword>();

  const navigate = useNavigate();

  const onValid: SubmitHandler<TChangePassword> = ({
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  }) => {
    changePassword({ oldPassword, newPassword, newPasswordConfirmation });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Nav />
      <h2>Change Password</h2>
      <form method="POST" onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="password">현재 비밀번호 </label>
          <input
            id="password"
            type="password"
            {...register('oldPassword', {
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
          {formErrors?.oldPassword && (
            <p className="error">{formErrors.oldPassword?.message}</p>
          )}
        </div>
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
        <button onClick={handleGoBack}>취소</button>
        <button type="submit">변경하기</button>
      </form>
    </div>
  );
}
