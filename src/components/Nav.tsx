import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Nav() {
  const { user } = useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="nav">
        <div className="navMenu">
          <NavLink to="/">홈</NavLink>
        </div>
        {user ? (
          <div className="navMenu">
            <button
              type="button"
              className="myBtn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              마이페이지
            </button>
            {isMenuOpen && (
              <div className="menuWrapper">
                <div className="menu">
                  <Link to="/my-profile">내 프로필</Link>
                  <Link to="/upload">업로드</Link>
                  <button type="button">로그아웃</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="navMenu">
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
