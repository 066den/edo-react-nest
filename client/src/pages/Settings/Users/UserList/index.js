import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import UpdateUser from "../../../../components/modal/UpdateUser";
import useRequest from "../../../../hooks/useRequest";
import { getUsers } from "../../../../redux/actions/user";
import { setUsers } from "../../../../redux/reducers/userReducer";
import "../user.scss";

import UserItem from "./UserItem";

const UserList = () => {
  const dispatch = useDispatch();
  const [users, loading] = useRequest(getUsers);
  const usersList = useSelector((state) => state.user.users);
  const [userId, setUserId] = useState(null);
  const [updateUserShow, setUpdateUserShow] = useState(false);

  useEffect(() => {
    dispatch(setUsers(users));
  }, [users]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <table className="user-list-table mt-0 table dataTable no-footer dtr-column">
        <thead className="table-light">
          <tr role="row">
            <th>Ім'я</th>
            <th>Посада</th>
            <th>Відділ</th>
            <th>Роль</th>
            <th>Налаштування</th>
          </tr>
        </thead>
        <tbody>
          {usersList &&
            usersList.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                show={setUpdateUserShow}
                setUserId={setUserId}
              />
            ))}
        </tbody>
      </table>
      <UpdateUser
        show={updateUserShow}
        onHide={() => setUpdateUserShow(false)}
        userId={userId}
      />
    </>
  );
};

export default UserList;
