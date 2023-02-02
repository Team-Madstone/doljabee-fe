import qs from 'qs';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APP } from '../constances/routes';
import { signToken } from '../services/user';

export default function Auth() {
  const query = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (query.token) {
          await signToken(query.token as string);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyToken();
  }, [query]);
  return (
    <div>
      <Link to={APP.LOGIN}>
        <button>로그인 하기</button>
      </Link>
    </div>
  );
}
