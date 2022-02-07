import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { getSettings } from "../../actions/user";
import Heading from "../../layouts/components/Heading";
import IconSvg from "../../lib/Svg/IconSvg";

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  return (
    <>
      <Heading title="Налаштування" />
      <div className="content-body">
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <NavLink to="/settings/users" className="nav-link">
              <IconSvg id="user" />
              <span className="fw-bold">Користувачі</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings/departments" className="nav-link">
              <IconSvg id="feather-box" />
              <span className="fw-bold">Відділи</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings/roles" className="nav-link">
              <IconSvg id="feather-box" />
              <span className="fw-bold">Ролі</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings/general" className="nav-link">
              <IconSvg id="feather-box" />
              <span className="fw-bold">Інщі</span>
            </NavLink>
          </li>
        </ul>

        <Outlet />
      </div>
    </>
  );
};

export default Settings;
