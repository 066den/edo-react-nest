import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions/user";
import CreateUser from "../../../components/modal/CreateUser";
import IconSvg from "../../../components/Svg/IconSvg";
import UserList from "./UserList";
import useRequest from "../../../hooks/useRequest";
import { setUsers } from "../../../redux/reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  const [users, loading] = useRequest(getUsers);
  const [createUserShow, setCreateUserShow] = useState(false);
  const usersList = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(setUsers(users));
  }, [users]);

  return (
    <div className="card">
      <div className="card-header border-bottom p-3">
        <div className="header-label">
          <h4 className="mb-0">Користувачі</h4>
        </div>
        <div className="dt-action-buttons text-end">
          <div className="dt-buttons d-inline-flex">
            <button
              className="dt-button add-new btn btn-primary"
              onClick={() => {
                setCreateUserShow(true);
              }}
            >
              <span>
                <IconSvg id="plus" />
                Новий користувач
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="card-datatable table-responsive pt-0">
        <UserList usersList={usersList} loading={loading} />
      </div>
      <CreateUser
        show={createUserShow}
        onHide={() => setCreateUserShow(false)}
      />
    </div>
  );
};

export default Users;
