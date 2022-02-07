import "./navbar.scss";
import { NavLink } from "react-router-dom";
import IconSvg from "../../../lib/Svg/IconSvg";
import logo from "../../../logo.png";

const Navbar = () => {
  return (
    <div className="main-menu">
      <div className="navbar-header expanded">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item me-auto">
            <NavLink to="/" className="navbar-brand">
              <span className="brand-logo">
                <img src={logo} alt="Борівська селищна рада" />
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="main-menu-content">
        <ul className="navigation navigation-main">
          <li className="nav-item">
            <NavLink to="docs/add" className="d-flex align-items-center">
              <IconSvg id="edit" />
              <span className="menu-title text-truncate">Новий документ</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="docs/in" className="d-flex align-items-center">
              <IconSvg id="file-text" />
              <span className="menu-title text-truncate">Вхідні</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="docs/out" className="d-flex align-items-center">
              <IconSvg id="file-text" />
              <span className="menu-title text-truncate">Вихідні</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="docs/appeals" className="d-flex align-items-center">
              <IconSvg id="file-text" />
              <span className="menu-title text-truncate">Звернення</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="settings/users" className="d-flex align-items-center">
              <IconSvg id="setting" />
              <span className="menu-title text-truncate">Налаштування</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
