import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateSender from "../../components/modal/CreateSender";
import IconSvg from "../../components/Svg/IconSvg";
import { deleteSender, getSenders } from "../../redux/actions/user";
import { delSender } from "../../redux/reducers/userReducer";

const Senders = () => {
  const [createSenderShow, setCreateSenderShow] = useState(false);
  const [senderId, setSenderId] = useState(null);
  const dispatch = useDispatch();
  const senders = useSelector((state) => state.user.senders);

  const MySwal = withReactContent(Swal);

  const handleConfirmDelete = (id, name) => {
    return MySwal.fire({
      title: "Підтвердіть будь ласка",
      html: `Видалити контрагента? <br> <b>${name}</b>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Так",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSender(id);
        dispatch(delSender(id));
      }
    });
  };

  useEffect(() => {
    dispatch(getSenders());
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header border-bottom p-3">
          <div className="header-label">
            <h4 className="mb-0">Контрагенти</h4>
          </div>
          <div className="dt-action-buttons text-end">
            <div className="dt-buttons d-inline-flex">
              <button
                className="dt-button add-new btn btn-primary me-3"
                onClick={() => {
                  setCreateSenderShow(true);
                  setSenderId(null);
                }}
              >
                <span>
                  <IconSvg id="plus" />
                  Додати контрагента
                </span>
              </button>
              <button className="dt-button add-new btn btn-primary">
                <span>
                  <IconSvg id="plus" />
                  Створити групу
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center p-3 row">
          <div className="col-sm-12 col-md-6">
            <Form.Control placeholder="Для пошуку введіть назву організації або ім'я або ел. пошту" />
          </div>
        </div>
        <div className="card-datatable border-top table-responsive pt-0">
          <table className="table dataTable mt-0">
            <thead className="table-light">
              <tr>
                <th>Назва</th>
                <th>Електронна пошта</th>
                <th>Додаткові данні</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {senders.map(({ id, name, description, email }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>
                    <a href={`mailto:${email}`}>{email}</a>
                  </td>
                  <td>{description}</td>
                  <td>
                    <span
                      className="item-icon small primary"
                      onClick={() => {
                        setCreateSenderShow(true);
                        setSenderId(id);
                      }}
                    >
                      <IconSvg id="edit" />
                    </span>
                  </td>
                  <td>
                    <span
                      className="item-icon small danger"
                      onClick={() => handleConfirmDelete(id, name)}
                    >
                      <IconSvg id="trash" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateSender
        show={createSenderShow}
        onHide={() => setCreateSenderShow(false)}
        senderId={senderId}
      />
    </>
  );
};

export default Senders;
