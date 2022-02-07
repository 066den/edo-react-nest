import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import IconSvg from "../../../lib/Svg/IconSvg";

const General = () => {
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { value: "", description: "", number: Date.now() }]);
  };

  return (
    <div className="card">
      <div className="card-header border-bottom p-3">
        <div className="header-label">
          <h4 className="mb-0">Настраиваемые поля</h4>
        </div>
        <div className="dt-action-buttons text-end">
          <div className="dt-buttons d-inline-flex">
            <button className="dt-button add-new btn btn-primary">
              <span>
                <IconSvg id="plus" />
                Нове поле
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        <Row>
          <Col>
            {fields.map((item) => (
              <>
                <Row>
                  <Col md={2}>
                    <div className="mb-3">
                      <Form.Control placeholder="Назва" />
                    </div>
                  </Col>
                  <Col md={9}>
                    <div className="mb-3">
                      <Form.Control placeholder="Опис" />
                    </div>
                  </Col>
                  <Col md={1}>
                    <div className="mb-3">
                      <Button variant="outline-danger">
                        <IconSvg id="time" />
                      </Button>
                    </div>
                  </Col>
                </Row>
                <hr></hr>
              </>
            ))}
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
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default General;
