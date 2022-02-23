import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./modal.scss";
import IconSvg from "../Svg/IconSvg";
import {
  getNomenclature,
  updateNomenclature,
} from "../../redux/actions/documents";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const UpdateNum = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const { nomenclature } = useSelector((state) => state.doc);

  const MySwal = withReactContent(Swal);

  const handleConfirmDelete = (id, name) => {
    return MySwal.fire({
      title: "Підтвердіть будь ласка",
      html: `Видалити номенклатуру? <br> <b>${name}</b>`,
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
        setFields(fields.filter((item) => item.id !== id));
      }
    });
  };

  const addField = () => {
    setFields([
      ...fields,
      { value: "", description: "", id: Date.now(), readOnly: false },
    ]);
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
    dispatch(getNomenclature());
    onHide();
  };

  useEffect(() => {
    setFields(nomenclature.map((item) => ({ ...item, readOnly: true })));
  }, [nomenclature]);

  return (
    <Modal
      size="lg"
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
            {fields.map(({ id, value, description, readOnly }) => (
              <Fragment key={id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    {readOnly ? (
                      <p className="fw-bolder">{value}</p>
                    ) : (
                      <Form.Control
                        value={value}
                        placeholder="Назва"
                        onChange={(e) =>
                          changeField("value", e.target.value, id)
                        }
                      />
                    )}
                  </Col>
                  <Col md={9}>
                    {readOnly ? (
                      <p>{description}</p>
                    ) : (
                      <Form.Control
                        value={description}
                        as="textarea"
                        rows={3}
                        placeholder="Опис"
                        onChange={(e) =>
                          changeField("description", e.target.value, id)
                        }
                      />
                    )}
                  </Col>
                  <Col md={1}>
                    <div className="d-flex">
                      {readOnly && (
                        <span
                          className="item-icon"
                          onClick={() => updateField(id)}
                        >
                          <IconSvg id="edit" />
                        </span>
                      )}{" "}
                      <span
                        className="item-icon"
                        onClick={() => handleConfirmDelete(id, value)}
                      >
                        <IconSvg id="time" />
                      </span>
                    </div>
                  </Col>
                </Row>
                <hr></hr>
              </Fragment>
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
