import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { APP } from '../constances/routes';

export default function ForgotPasswordNotice() {
  return (
    <div>
      <Layout>
        <h2>비밀번호 설정 메일 발송</h2>
        <p>입력한 이메일로 비밀번호 설정 메일이 전송되었습니다.</p>
        <p>이 이메일은 1시간 뒤 만료됩니다.</p>
        <Link to={APP.LOGIN}>
          <button>로그인 하기</button>
        </Link>
        <Link to={APP.HOME}>
          <button>홈으로 가기</button>
        </Link>
      </Layout>
    </div>
  );
}
