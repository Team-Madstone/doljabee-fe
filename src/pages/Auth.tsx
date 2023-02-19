import { Link } from 'react-router-dom';
import { APP } from '../constances/routes';
import qs from 'qs';
import { verifyEmail } from '../services/user';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function Auth() {
  const query = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  const [authErr, setAuthErr] = useState<string>();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (query.token) {
          await verifyEmail(query.token as string);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg: string = error.response?.data?.message;
          if (errorMsg) {
            setAuthErr(errorMsg);
          }
        }
      }
    };
    verifyToken();
  }, [query]);

  return (
    <div>
      {authErr ? <p>{authErr}</p> : <p>인증이 완료되었습니다.</p>}

      <Link to={APP.LOGIN}>
        <button>로그인 하기</button>
      </Link>
    </div>
  );
}
