import { Link } from 'react-router-dom';
import { APP } from '../constances/routes';
import qs from 'qs';
import { verifyEmail } from '../services/user';
import { isAxiosError } from 'axios';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import NotFound from './NotFound';
import Layout from '../components/Layout';
import styles from '../styles/auth.module.scss';

export default function Auth() {
  const query = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const { isLoading, isError, error } = useQuery('verifyEmail', () =>
    verifyEmail(query.token as string)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError && isAxiosError(error)) {
    return <NotFound />;
  }

  return (
    <div>
      <Layout>
        <div className={styles.div}>
          <h2 className={styles.title}>인증 완료</h2>
          <p className={styles.p}>이메일 인증이 완료되었습니다.</p>
          <Link to={APP.LOGIN}>
            <button className={styles.btn}>로그인 하기</button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}
