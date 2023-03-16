import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { APP } from '../constances/routes';
import styles from '../styles/notice.module.scss';

export default function Notice() {
  return (
    <div>
      <Layout>
        <div className={styles.div}>
          <h2 className={styles.title}>회원가입 완료</h2>
          <p className={styles.p}>
            가입한 이메일로 인증 시 원활한 서비스를 이용할 수 있습니다. <br />
            이메일 인증은 1시간 뒤 만료됩니다.
          </p>
          <div className={styles.btnWrapper}>
            <Link to={APP.LOGIN}>
              <button className={styles.btn}>로그인 하기</button>
            </Link>
            <Link to={APP.HOME}>
              <button className={styles.btn}>홈으로 가기</button>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}
