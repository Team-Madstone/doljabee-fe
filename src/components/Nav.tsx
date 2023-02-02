import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <nav className="nav">
        <div className="navMenu">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="navMenu">
          <NavLink to="/upload">Upload</NavLink>
        </div>
        <div className="navMenu">
          <NavLink to="/login">Login</NavLink>
        </div>
      </nav>
    </div>
  );
}
