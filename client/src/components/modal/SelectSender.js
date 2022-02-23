import { Button, Modal } from "react-bootstrap";

import "./modal.scss";
import Senders from "../../pages/Senders";

const SelectSender = ({ show, onHide, hendleSelectSender }) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Senders modal />
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button
          variant="primary"
          onClick={() => {
            hendleSelectSender();
            onHide();
          }}
        >
          Вибрати
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectSender;
