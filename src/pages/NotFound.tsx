import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { APP } from '../constances/routes';
import styles from '../styles/notFound.module.scss';

export default function NotFound() {
  return (
    <div>
      <Layout>
        <div className={styles.div}>
          <h2 className={styles.title}>404 Not Found</h2>
          <p className={styles.p}>존재하지 않는 페이지입니다.</p>
          <div className={styles.btnWrapper}>
            <Link to={APP.HOME}>
              <button className={styles.btn}>홈으로 가기</button>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}
