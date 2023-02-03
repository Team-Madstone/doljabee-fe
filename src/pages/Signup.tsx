import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { CLIENT_DOMAIN } from '../constances/domain';
import { APP } from '../constances/routes';
import { signup } from '../services/user';
import { TReqError } from '../types/error';
import { TSignupForm } from '../types/user';

const callbackUrl = `${CLIENT_DOMAIN}/user/finish`;

export default function Signup() {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<TSignupForm>();
  const navigate = useNavigate();
  const [nameErr, setNameErr] = useState<TReqError>();
  const [emailErr, setEmailErr] = useState<TReqError>();
  const [usernameErr, setUsernameErr] = useState<TReqError>();
  const [passwordErr, setPasswordErr] = useState<TReqError>();

  const onValid: SubmitHandler<TSignupForm> = async ({
    name,
    email,
    username,
    password,
  }: TSignupForm) => {
    try {
      await signup({ name, username, email, password, callbackUrl });
      navigate(APP.LOGIN);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors: TReqError[] = error.response?.data?.errors;
        if (errors && errors instanceof Array) {
          setNameErr(errors.find((err) => err.param === 'name'));
          setUsernameErr(errors.find((err) => err.param === 'username'));
          setEmailErr(errors.find((err) => err.param === 'email'));
          setPasswordErr(errors.find((err) => err.param === 'password'));
        }
      }
    }
  };

  return (
    <div>
      <Nav />
      <div>Signup</div>
      <form method="POST" onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: '이름은 필수입니다.',
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
          {formErrors?.name && (
            <p className="error">{formErrors.name?.message}</p>
          )}
        </div>
        {nameErr && <p>{nameErr.msg}</p>}
        <div>
          <label htmlFor="username">Username</label>
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
        {usernameErr && <p>{usernameErr.msg}</p>}
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
        {emailErr && <p>{emailErr.msg}</p>}
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
          {formErrors?.password && (
            <p className="error">{formErrors.password?.message}</p>
          )}
        </div>
        {passwordErr && <p>{passwordErr.msg}</p>}
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
