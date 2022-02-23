import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useRequest from "../../hooks/useRequest";
import { getUsers } from "../../redux/actions/user";
import { setUsers } from "../../redux/reducers/userReducer";
import Loading from "../Loading";
import castomAvatar from "./../../assets/ava.png";

const SelectUser = ({ show, onHide, setExecutors }) => {
  const [users, loading] = useRequest(getUsers);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      checked: [],
    },
    onSubmit: (values, { resetForm }) => {
      const parseValues = values.checked.map((val) => JSON.parse(val));
      setExecutors((prevValue) => [...prevValue, ...parseValues]);
      resetForm({ checked: [] });
      onHide();
    },
  });

  useEffect(() => {
    dispatch(setUsers(users));
  }, [users]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title>Вибор виконавців </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Loading />}
        {users && (
          <table className="user-list-table mt-0 table">
            <thead className="table-light">
              <tr role="row">
                <th></th>
                <th>Ім'я</th>
                <th>Посада</th>
                <th>Відділ</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, full_name, avatar, post, department }) => (
                <tr key={id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      name="checked"
                      value={JSON.stringify({ id, full_name })}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td>
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
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">{post}</span>
                  </td>
                  <td>{department && department.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button variant="primary" onClick={formik.handleSubmit}>
          Додати
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectUser;
