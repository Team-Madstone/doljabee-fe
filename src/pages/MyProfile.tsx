import { useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { CLIENT_DOMAIN } from '../constances/domain';
import { APP } from '../constances/routes';
import { UserContext } from '../context/UserContext';
import { getMyProfile, resendVerifyEmail } from '../services/user';

const callbackUrl = `${CLIENT_DOMAIN}/user/finish`;

export default function MyProfile() {
  const { user, isLoading: userLoading } = useContext(UserContext);
  const { data, isLoading } = useQuery('myProfile', getMyProfile);

  const navigate = useNavigate();

  const { mutate: resendVerifyEmailMutation } = useMutation(resendVerifyEmail, {
    onSuccess: () => {
      alert('이메일 전송을 완료했습니다.');
    },
    onError: () => {
      alert('이메일 전송을 실패했습니다.');
    },
  });

  useEffect(() => {
    if (!userLoading && !user) {
      alert('로그인 후 이용할 수 있습니다.');
      navigate(APP.LOGIN);
    }
  }, [user, userLoading, navigate]);

  if (isLoading || userLoading) {
    return <Loading />;
  }

  const handleResendVerifyEmail = () => {
    resendVerifyEmailMutation({ callbackUrl });
  };

  return (
    <div>
      <Nav />
      <div>My Profile</div>
      {data && (
        <div>
          <p>이메일: {data.data.email}</p>
          <p>닉네임: {data.data.username}</p>
          <p>
            이메일 인증 여부:{' '}
            {data.data.verifyEmail ? '인증 완료' : '인증되지 않음'}
          </p>
          <Link
            to={APP.CHANGEUSERNAME}
            state={{ username: data.data.username }}
          >
            <button>닉네임 수정</button>
          </Link>
          <Link to={APP.CHANGEPASSWORD}>
            <button>비밀번호 변경</button>
          </Link>
          {!data.data.verifyEmail && (
            <button onClick={handleResendVerifyEmail}>인증 메일 재전송</button>
          )}
        </div>
      )}
    </div>
  );
}
