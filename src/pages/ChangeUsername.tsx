import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { UserContext } from '../context/UserContext';
import { changeUsername } from '../services/user';
import { TChangeUsername } from '../types/user';

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

  const onValid: SubmitHandler<TChangeUsername> = async ({ username }) => {
    changeUsername({ username });
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
  }, []);

  return (
    <div>
      <Nav />
      <h2>Change Username</h2>
      <form method="POST" onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="username">닉네임 </label>
          <input
            id="username"
            type="text"
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
          {formErrors?.username && (
            <p className="error">{formErrors.username?.message}</p>
          )}
        </div>
        <button onClick={handleGoBack}>취소</button>
        <button type="submit">변경하기</button>
      </form>
    </div>
  );
}
