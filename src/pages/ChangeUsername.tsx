import { isAxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router';
import Layout from '../components/Layout';
import { APP } from '../constances/routes';
import { UserContext } from '../context/UserContext';
import { changeUsername } from '../services/user';
import { TChangeUsername } from '../types/user';
import styles from '../styles/changeUsername.module.scss';

export default function ChangeUsername() {
  const { user, isLoading: userLoading } = useContext(UserContext);
  const location = useLocation();

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setValue,
  } = useForm<TChangeUsername>();

  const navigate = useNavigate();

  const {
    mutate: changeUsernameMutation,
    isLoading,
    isError,
    error,
  } = useMutation(changeUsername, {
    onSuccess: () => {
      alert('닉네임이 변경되었습니다.');
      navigate(APP.MYPROFILE);
    },
  });

  const onValid: SubmitHandler<TChangeUsername> = async ({ username }) => {
    changeUsernameMutation({ username });
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
      navigate(APP.HOME);
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    setValue('username', location.state.username);
  }, [location.state.username, setValue]);

  return (
    <div>
      <Layout>
        <div className={styles.div}>
          <h2 className={styles.title}>Change Username</h2>
          <form
            method="POST"
            onSubmit={handleSubmit(onValid)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <div className={styles.inputWrapper}>
              <label htmlFor="username" className={styles.label}>
                닉네임{' '}
              </label>
              <input
                id="username"
                type="text"
                className={styles.input}
                {...register('username', {
                  required: '닉네임은 필수입니다.',
                  minLength: {
                    value: 2,
                    message: '2글자 이상 작성해주세요.',
                  },
                  maxLength: {
                    value: 10,
                    message: '10글자 이하로 작성해주세요.',
                  },
                })}
              />
            </div>
            {formErrors?.username && (
              <p className={styles.errorMsg}>{formErrors.username?.message}</p>
            )}
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
