import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { APP } from '../constances/routes';
import { UserContext } from '../context/UserContext';
import { logoutUser } from '../services/user';
import { onLogoutSuccess } from '../utils/axios';
import styles from '../styles/components/nav.module.scss';
import classNames from 'classnames';
import '../styles/components/button.scss';

export default function Nav() {
  const { user, removeUser } = useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: logoutMutation } = useMutation(logoutUser, {
    onSuccess: () => {
      onLogoutSuccess();
      removeUser();
      navigate(APP.HOME);
    },
  });

  const logout = () => {
    logoutMutation();
  };

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navMenu}>
          <NavLink to="/">홈</NavLink>
        </div>
        {user ? (
          <div className={styles.navMenu}>
            <button
              type="button"
              className={classNames('btn', 'medium', 'black')}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              마이페이지
            </button>
            {isMenuOpen && (
              <div className={styles.menuWrapper}>
                <div className={styles.menu}>
                  <Link to="/my-profile">내 프로필</Link>
                  <Link to="/upload">업로드</Link>
                  <button
                    type="button"
                    onClick={logout}
                    className={classNames('bg-btn')}
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.navMenu}>
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
