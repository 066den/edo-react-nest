import { useState } from "react";
import CreateDepartment from "../../../lib/modal/CreateDepartment";
import DepList from "./DepList";

const Departments = () => {
  const [createDepShow, setCreateDepShow] = useState(false);

  return (
    <div className="card">
      <div className="card-header border-bottom">
        <h4 className="card-title">Відділи, підприємства, установи</h4>
      </div>
      <div className="card-datatable table-responsive pt-0">
        <div className="justify-content-between align-items-center header-actions mx-4 pb-2 row mt-2">
          <div className="col-sm-12 col-lg-8 ps-xl-75 ps-0">
            <div className="dt-buttons d-inline-flex mt-2">
              <button
                className="dt-button add-new btn btn-primary"
                type="button"
                onClick={() => setCreateDepShow(true)}
              >
                <span>Новий відділ</span>
              </button>
            </div>
          </div>
        </div>
        <table className="user-list-table table dataTable no-footer dtr-column">
          <thead className="table-light">
            <tr role="row">
              <th>Назва</th>
              <th>код</th>
            </tr>
          </thead>
          <DepList />
        </table>
      </div>

      <CreateDepartment
        show={createDepShow}
        onHide={() => setCreateDepShow(false)}
      />
    </div>
  );
};

export default Departments;
