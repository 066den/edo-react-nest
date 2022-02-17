import { useState } from "react";
import UpdateUser from "../../../../components/modal/UpdateUser";
import "../user.scss";

import UserItem from "./UserItem";

const UserList = ({ usersList, loading }) => {
  const [userId, setUserId] = useState(null);
  const [updateUserShow, setUpdateUserShow] = useState(false);

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
          {!loading &&
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
