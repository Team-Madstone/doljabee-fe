import { isAxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { UserContext } from '../context/UserContext';
import { changePassword } from '../services/user';
import { TChangePassword } from '../types/user';

export default function ChangePassword() {
  const { user, isLoading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<TChangePassword>();

  const {
    mutate: changePasswordMutation,
    isLoading,
    isError,
    error,
  } = useMutation(changePassword, {
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다.');
      navigate(APP.MYPROFILE);
    },
  });

  const onValid: SubmitHandler<TChangePassword> = ({
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  }) => {
    changePasswordMutation({
      oldPassword,
      newPassword,
      newPasswordConfirmation,
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!userLoading && !user) {
      alert('로그인 후 이용할 수 있습니다.');
      navigate(APP.LOGIN);
    }
  }, [user, userLoading, navigate]);

  if (userLoading) {
    return <Loading />;
  }

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
        {isError && isAxiosError(error) && (
          <p>{error.response?.data.message}</p>
        )}
        <button onClick={handleGoBack}>취소</button>
        <button disabled={isLoading} type="submit">
          {isLoading ? '변경중' : '변경하기'}
        </button>
      </form>
    </div>
  );
}
