import { isAxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { UserContext } from '../context/UserContext';
import { loginUser } from '../services/user';
import { TLoginForm } from '../types/user';
import { onLoginSuccess } from '../utils/axios';

export default function Login() {
  const { getUser } = useContext(UserContext);
  const { user, isLoading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginForm>();

  const {
    mutate: loginMutation,
    isLoading,
    isError,
    error,
  } = useMutation(loginUser, {
    onSuccess: (data) => {
      onLoginSuccess(data);
      getUser();
      navigate(APP.HOME);
    },
  });

  const onValid: SubmitHandler<TLoginForm> = ({
    email,
    password,
  }: TLoginForm) => {
    loginMutation({ email, password });
  };

  useEffect(() => {
    if (user && !userLoading) {
      navigate(APP.HOME);
    }
  }, [user, userLoading, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Nav />
      <div>Login</div>
      <form method="POST" onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            {...register('email', {
              required: '이메일은 필수입니다.',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors?.email && <p className="error">{errors.email?.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
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
          {errors?.password && (
            <p className="error">{errors.password?.message}</p>
          )}
        </div>
        {isError && isAxiosError(error) && (
          <p>{error.response?.data.message}</p>
        )}
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to={APP.SIGNUP}>
            <button>회원가입</button>
          </Link>
        </div>
        <div>
          <Link to={APP.FORGOTPASSWORD}>
            <button>비밀번호 찾기</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
