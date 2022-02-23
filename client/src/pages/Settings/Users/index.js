import { useState } from "react";

import CreateUser from "../../../components/modal/CreateUser";
import IconSvg from "../../../components/Svg/IconSvg";
import UserList from "./UserList";

const Users = () => {
  const [createUserShow, setCreateUserShow] = useState(false);

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
        <UserList />
      </div>
      <CreateUser
        show={createUserShow}
        onHide={() => setCreateUserShow(false)}
      />
    </div>
  );
};

export default Users;
