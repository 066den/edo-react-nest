import IconSvg from "../../../lib/Svg/IconSvg";
import CreateDocument from "../../../lib/modal/CreateDocument";
import { useState } from "react";

const OutDocuments = () => {
  const [createDocumentShow, setCreateDocumentShow] = useState(false);

  return (
    <div className="card">
      <div className="card-header border-bottom p-3">
        <div className="header-label">
          <h4 className="mb-0">Вихідні документи</h4>
        </div>
        <div className="dt-action-buttons text-end">
          <div className="dt-buttons d-inline-flex">
            <button
              className="dt-button add-new btn btn-primary"
              onClick={() => setCreateDocumentShow(true)}
            >
              <span>
                <IconSvg id="plus" />
                Новий документ
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="card-datatable table-responsive pt-0">
        <CreateDocument
          show={createDocumentShow}
          onHide={() => setCreateDocumentShow(false)}
        />
      </div>
    </div>
  );
};

export default OutDocuments;
