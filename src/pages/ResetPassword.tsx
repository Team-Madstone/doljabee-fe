import { isAxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router';
import Layout from '../components/Layout';
import { APP } from '../constances/routes';
import { resetPassword } from '../services/user';
import { TResetPassword } from '../types/user';
import styles from '../styles/resetPassword.module.scss';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.search.split('=')[1].split('&')[0];

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<TResetPassword>();

  const {
    mutate: resetPasswordMutation,
    isLoading,
    isError,
    error,
  } = useMutation(resetPassword, {
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다.');
      navigate(APP.HOME);
    },
  });

  const onValid: SubmitHandler<TResetPassword> = async ({
    newPassword,
    newPasswordConfirmation,
  }) => {
    resetPasswordMutation({
      email,
      newPassword,
      newPasswordConfirmation,
    });
  };

  return (
    <div>
      <Layout>
        <div className={styles.div}>
          <h2 className={styles.title}>Reset Password</h2>
          <form method="POST" onSubmit={handleSubmit(onValid)}>
            <div className={styles.inputWrapper}>
              <label className={styles.label} htmlFor="password">
                새로운 비밀번호{' '}
              </label>
              <input
                id="password"
                type="password"
                className={styles.input}
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
            <div className={styles.inputWrapper}>
              <label className={styles.label} htmlFor="password">
                새로운 비밀번호 확인{' '}
              </label>
              <input
                id="password"
                type="password"
                className={styles.input}
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
            <button className={styles.btn} type="submit" disabled={isLoading}>
              {isLoading ? '변경중' : '변경하기'}
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
