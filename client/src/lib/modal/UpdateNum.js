import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, NavItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./modal.scss";
import IconSvg from "../Svg/IconSvg";
import { getNomenclature, updateNomenclature } from "../../actions/documents";

const UpdateNum = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const { nomenclature } = useSelector((state) => state.doc);

  const addField = () => {
    setFields([
      ...fields,
      { value: "", description: "", id: Date.now(), readOnly: false },
    ]);
  };

  const removeField = (id) => {
    setFields(fields.filter((item) => item.id !== id));
  };

  const updateField = (id) => {
    setFields(
      fields.map((item) =>
        item.id === id ? { ...item, readOnly: false } : item
      )
    );
  };

  const changeField = (key, value, id) => {
    setFields(
      fields.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const addCustomField = () => {
    updateNomenclature(fields);
    onHide();
    dispatch(getNomenclature());
  };

  useEffect(() => {
    setFields(nomenclature.map((item) => ({ ...item, readOnly: true })));
  }, [nomenclature]);

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onHide}
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title>Номенклатура</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            {fields.map((item) => (
              <>
                <Row key={item.number} className="align-items-center">
                  <Col md={2}>
                    <div className="mb-2">
                      {item.readOnly ? (
                        <p className="fw-bolder">{item.value}</p>
                      ) : (
                        <Form.Control
                          value={item.value}
                          placeholder="Назва"
                          onChange={(e) =>
                            changeField("value", e.target.value, item.id)
                          }
                        />
                      )}
                    </div>
                  </Col>
                  <Col md={9}>
                    <div className="mb-2">
                      {item.readOnly ? (
                        <p>{item.description}</p>
                      ) : (
                        <Form.Control
                          value={item.description}
                          as="textarea"
                          rows={3}
                          placeholder="Опис"
                          onChange={(e) =>
                            changeField("description", e.target.value, item.id)
                          }
                        />
                      )}
                    </div>
                  </Col>
                  <Col md={1}>
                    <div className="mb-2">
                      <span
                        className="item-icon"
                        onClick={() => removeField(item.id)}
                      >
                        <IconSvg id="time" />
                      </span>{" "}
                      {item.readOnly && (
                        <span
                          className="item-icon"
                          onClick={() => updateField(item.id)}
                        >
                          <IconSvg id="edit" />
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
                <hr></hr>
              </>
            ))}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <button
          className="btn btn-icon btn-primary waves-effect waves-float waves-light"
          type="button"
          onClick={addField}
        >
          <span className="me-1">
            <IconSvg id="plus" />
          </span>
          <span>Додати</span>
        </button>
        <Button variant="primary" onClick={addCustomField}>
          Зберегти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateNum;
