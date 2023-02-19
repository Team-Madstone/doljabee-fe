import { Link } from 'react-router-dom';
import { APP } from '../constances/routes';

export default function NotFound() {
  return (
    <div>
      <div>404 Not Found</div>

      <p>존재하지 않는 페이지입니다.</p>

      <Link to={APP.HOME}>
        <button>홈으로 가기</button>
      </Link>
    </div>
  );
}
