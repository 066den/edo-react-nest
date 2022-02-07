import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import IconSvg from "../../../lib/Svg/IconSvg";
import { logout } from "../../../reducers/userReducer";
import castomAvatar from "./../../../assets/ava.png";

import "./header.scss";

const Header = () => {
  const dispatch = useDispatch();

  const { full_name, post, avatar } = useSelector(
    (state) => state.user.currentUser
  );

  return (
    <nav className="header-navbar navbar navbar-expand-lg align-items-center navbar-light container">
      <div className="navbar-container d-flex content">
        <div className="bookmark-wrapper d-flex align-items-center">
          <ul className="nav navbar-nav bookmark-icons">
            <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link"
                href="!#"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title=""
                data-bs-original-title="Email"
                aria-label="Email"
              >
                <IconSvg id="mail" />
              </a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link"
                href="!#"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title=""
                data-bs-original-title="Todo"
                aria-label="Todo"
              >
                <IconSvg id="todo" />
              </a>
            </li>
          </ul>
        </div>
        <ul className="nav navbar-nav align-items-center ms-auto">
          <NavDropdown
            className="dropdown-user"
            as="li"
            title={
              <>
                <div className="user-nav d-sm-flex d-none">
                  <span className="user-name fw-bolder">{full_name}</span>
                  <span className="user-status">{post}</span>
                </div>
                <span className="avatar">
                  <img
                    className="round"
                    src={
                      (avatar &&
                        `${process.env.REACT_APP_API_URL}/image/${avatar}`) ||
                      castomAvatar
                    }
                    alt="avatar"
                    height="40"
                    width="40"
                  />
                </span>
              </>
            }
          >
            <NavDropdown.Item onClick={() => dispatch(logout())}>
              <IconSvg id="power" /> Вийти
            </NavDropdown.Item>
          </NavDropdown>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
