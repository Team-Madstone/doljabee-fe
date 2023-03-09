import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { APP } from '../constances/routes';

export default function Notice() {
  return (
    <div>
      <Layout>
        <p>가입한 이메일로 인증 시 원활한 서비스를 이용할 수 있습니다.</p>
        <p>이메일 인증은 1시간 뒤 만료됩니다.</p>
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
