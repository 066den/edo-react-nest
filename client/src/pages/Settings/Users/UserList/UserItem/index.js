import { Dropdown } from "react-bootstrap";

import IconSvg from "../../../../../components/Svg/IconSvg";

import castomAvatar from "./../../../../../assets/ava.png";

const UserItem = ({ user, show, setUserId }) => {
  const { id, full_name, avatar, email, department, post, role } = user;

  return (
    <tr>
      <td className="sorting_1">
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <div className="avatar me-2">
              <img
                src={
                  (avatar &&
                    `${process.env.REACT_APP_API_URL}/avatar/${avatar}`) ||
                  castomAvatar
                }
                alt="Avatar"
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            <span className="user_name text-truncate text-body">
              <span className="fw-bolder">{full_name}</span>
            </span>
            <small className="emp_post text-muted">{email}</small>
          </div>
        </div>
      </td>
      <td>
        <span className="text-nowrap">{post}</span>
      </td>
      <td>{department && department.description}</td>
      <td>
        <span className="text-truncate align-middle">
          <span
            className={`feather feather-user svg-${
              role.value.toLowerCase() || ""
            } me-2`}
          >
            {role.value && <IconSvg id={role.value.toLowerCase()} />}
          </span>
          {role.description || ""}
        </span>
      </td>
      <td>
        <div className="btn-group actions">
          <Dropdown>
            <Dropdown.Toggle className="hide-arrow" variant="link">
              <IconSvg id="more-vertical" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                href="#"
                onClick={() => {
                  show(true);
                  setUserId(id);
                }}
              >
                <IconSvg id="file-text" /> Редагувати
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <IconSvg id="trash" /> Видалити
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
};

export default UserItem;
