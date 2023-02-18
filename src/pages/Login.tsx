import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { login } from '../services/user';
import { TLoginForm } from '../types/user';

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginForm>();

  const onValid: SubmitHandler<TLoginForm> = async ({
    email,
    password,
  }: TLoginForm) => {
    try {
      await login({ email, password });
      navigate(APP.HOME);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to={APP.SIGNUP}>
            <button>회원가입</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
