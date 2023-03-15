import { isAxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { APP } from '../constances/routes';
import { UserContext } from '../context/UserContext';
import { changePassword } from '../services/user';
import { TChangePassword } from '../types/user';
import styles from '../styles/changePassword.module.scss';

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

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
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
      <Layout>
        <div className={styles.div}>
          <h2 className={styles.title}>Change Password</h2>
          <form
            method="POST"
            onSubmit={handleSubmit(onValid)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <div className={styles.container}>
              <div className={styles.inputWrapper}>
                <label htmlFor="password" className={styles.label}>
                  현재 비밀번호{' '}
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
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
              </div>
              {formErrors?.oldPassword && (
                <p className={styles.errorMsg}>
                  {formErrors.oldPassword?.message}
                </p>
              )}
              <div className={styles.inputWrapper}>
                <label htmlFor="newPassword" className={styles.label}>
                  새로운 비밀번호{' '}
                </label>
                <input
                  id="newPassword"
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
              </div>
              {formErrors?.newPassword && (
                <p className={styles.errorMsg}>
                  {formErrors.newPassword?.message}
                </p>
              )}
              <div className={styles.inputWrapper}>
                <label htmlFor="newPasswordCheck" className={styles.label}>
                  새로운 비밀번호 확인{' '}
                </label>
                <input
                  id="newPasswordCheck"
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
              </div>
              {formErrors?.newPasswordConfirmation && (
                <p className={styles.errorMsg}>
                  {formErrors.newPasswordConfirmation?.message}
                </p>
              )}
            </div>
            {isError && isAxiosError(error) && (
              <p className={styles.errorMsg}>{error.response?.data.message}</p>
            )}
            <div className={styles.btnWrapper}>
              <button className={styles.button} onClick={handleGoBack}>
                취소
              </button>
              <button
                className={styles.button}
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? '변경중' : '변경하기'}
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
