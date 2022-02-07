import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser } from "../../actions/user";
import Input from "../Input";
import Select from "../Select";
import "./modal.scss";

const UpdateUser = ({ show, onHide, userId }) => {
  const dispatch = useDispatch();
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [post, setPost] = useState("");
  const [departmentId, setDepartmentId] = useState("0");
  const [roleId, setRoleId] = useState("0");
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const { departments, roles, users } = useSelector((state) => state.user);

  useEffect(() => {
    const updateUser = users.find((el) => el.id === userId);
    if (updateUser) {
      setName(updateUser.full_name);
      setEmail(updateUser.email);
      setPost(updateUser.post || "");
      setDepartmentId(updateUser.departmentId || 0);
      setRoleId(updateUser.roleId || 0);
    }
  }, [userId]);

  const editUser = () => {
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("email", email);
    //formData.append("password", password);
    formData.append("post", post);
    formData.append("departmentId", departmentId);
    formData.append("roleId", roleId);
    formData.append("avatar", file);
    updateUser(formData, userId).then((data) => {
      dispatch(getUsers());
      onHide();
    });
  };

  return (
    <Modal
      className="modal-dialog-centered modal-edit-user"
      size="lg"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton className="bg-transparent"></Modal.Header>
      <Modal.Body>
        <div className="text-center mb-2">
          <h1 className="mb-1">Редагувати користувача</h1>
        </div>
        <Form className="row gy-3 pt-4">
          <div className="col-12 col-md-6">
            <Input
              value={full_name}
              placeholder="Прізвище, ініціали"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-6">
            <Input
              value={email}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-6">
            <Input
              value={post}
              placeholder="Посада"
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-6">
            <Select
              label="Роль"
              id="role"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              <option>--вибрати--</option>
              {roles
                .filter((e) => e.value !== "ADMIN")
                .map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.description}
                  </option>
                ))}
            </Select>
          </div>
          <div className="col-12">
            <Select
              label="Відділ"
              id="department"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="0">--виберіть--</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.description}
                </option>
              ))}
            </Select>
          </div>

          <Input type="file" onChange={selectFile} />
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button variant="primary" onClick={editUser}>
          Редагувати
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUser;
