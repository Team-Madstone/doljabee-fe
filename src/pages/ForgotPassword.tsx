import { isAxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Nav from '../components/Nav';
import { CLIENT_DOMAIN } from '../constances/domain';
import { APP } from '../constances/routes';
import { UserContext } from '../context/UserContext';
import { forgotPassword } from '../services/user';
import { TForgotPassword } from '../types/user';

const callbackUrl = `${CLIENT_DOMAIN}/reset-password`;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { user, isLoading: userLoading } = useContext(UserContext);
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<TForgotPassword>();

  const [error, setError] = useState('');

  const forgotPasswordQuery = async ({
    email,
    callbackUrl,
  }: TForgotPassword) => {
    try {
      await forgotPassword({ email, callbackUrl });
      navigate(APP.FORGOTPASSWORDNOTICE);
    } catch (error) {
      if (error && isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };

  const onValid: SubmitHandler<TForgotPassword> = async ({
    email,
  }: TForgotPassword) => {
    await forgotPasswordQuery({ email, callbackUrl });
  };

  useEffect(() => {
    if (user && !userLoading) {
      navigate(APP.HOME);
    }
  }, [user, userLoading, navigate]);

  return (
    <div>
      <Nav />
      <h2>비밀번호 재설정</h2>
      <p>
        비밀번호를 잃어버리셨나요? <br />
        Doljabee에 가입한 이메일을 정확히 입력해주세요. <br />
        이메일을 통해 비밀번호 변경 링크가 전송됩니다. <br />
      </p>
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
          {formErrors?.email && (
            <p className="error">{formErrors.email?.message}</p>
          )}
        </div>
        {error && <p>{error}</p>}
        <button type="submit">확인</button>
      </form>
    </div>
  );
}
