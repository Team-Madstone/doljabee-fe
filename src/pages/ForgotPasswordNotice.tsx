import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { APP } from '../constances/routes';
import styles from '../styles/forgotPasswordNotice.module.scss';

export default function ForgotPasswordNotice() {
  return (
    <div>
      <Layout>
        <div className={styles.div}>
          <h2 className={styles.title}>비밀번호 설정 메일 발송</h2>
          <p className={styles.p}>
            입력한 이메일로 비밀번호 설정 메일이 전송되었습니다.
            <br />이 이메일은 1시간 뒤 만료됩니다.
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
