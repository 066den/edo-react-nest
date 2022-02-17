import { Button, Col, Modal, Row } from "react-bootstrap";

import "./modal.scss";
import IconSvg from "../Svg/IconSvg";

const SelectSender = ({ show, onHide }) => {
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
          <Col></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <button
          className="btn btn-icon btn-primary waves-effect waves-float waves-light"
          type="button"
        >
          <span className="me-1">
            <IconSvg id="plus" />
          </span>
          <span>Додати</span>
        </button>
        <Button variant="primary">Зберегти</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectSender;
