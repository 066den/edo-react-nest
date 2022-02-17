import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUsers } from "../../redux/actions/user";
import Input from "../form/Input";
import Select from "../form/Select";
import "./modal.scss";

const CreateUser = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [post, setPost] = useState("");
  const [departmentId, setDepartmentId] = useState("0");
  const [roleId, setRoleId] = useState("2");
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const { departments, roles } = useSelector((state) => state.user);

  const addUser = () => {
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("post", post);
    formData.append("departmentId", departmentId);
    formData.append("roleId", roleId);
    formData.append("avatar", file);
    createUser(formData).then((data) => {
      setName("");
      setEmail("");
      dispatch(getUsers());
      onHide();
    });
  };

  return (
    <Modal className="modal-slide-in" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Додати користувача</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Input
            value={full_name}
            placeholder="Прізвище, ініціали"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Пароль"
            value={password}
            type="password"
            placeholder="........"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            value={post}
            placeholder="Посада"
            onChange={(e) => setPost(e.target.value)}
          />

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

          <Select
            label="Роль"
            id="role"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles
              .filter((e) => e.value !== "ADMIN")
              .map((role) => (
                <option key={role.id} value={role.id}>
                  {role.description}
                </option>
              ))}
          </Select>

          <Input type="file" onChange={selectFile} />
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button variant="primary" onClick={addUser}>
          Зареєструвати
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUser;
