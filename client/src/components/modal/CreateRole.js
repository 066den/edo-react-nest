import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createRole, getSettings } from "../../redux/actions/user";

import Input from "../form/Input";
import "./modal.scss";

const CreateRole = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const addRole = () => {
    createRole({ value, description }).then((data) => {
      setValue("");
      setDescription("");
      onHide();
      dispatch(getSettings());
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Додати роль</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Input
            value={description}
            placeholder="Назва"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            value={value}
            placeholder="Значення"
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button variant="primary" onClick={addRole}>
          Зберегти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRole;
