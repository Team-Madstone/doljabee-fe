import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';

export default function Login() {
  return (
    <div>
      <Nav />
      <div>Login</div>
      <form method="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to={APP.SIGNUP}>
            <button>회원가입</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
