import { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNomenclature } from "../../actions/documents";
import Flatpickr from "react-flatpickr";
import { Ukrainian as uk } from "flatpickr/dist/l10n/uk.js";
import Input from "../Input";
import "./modal.scss";
import UpdateNum from "./UpdateNum";
import { useLocation } from "react-router-dom";

const CreateDocument = ({ show, onHide, title }) => {
  const [entryDate, setEntryDate] = useState(new Date());
  const [docDate, setDocDate] = useState(new Date());
  const [updateNumShow, setUpdateNumShow] = useState(false);
  const dispatch = useDispatch();
  const { nomenclature } = useSelector((state) => state.doc);
  const location = useLocation();

  useEffect(() => {
    dispatch(getNomenclature());
  }, [dispatch]);

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Додати {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <label className="form-label">
                  Індекс надходження
                  <span
                    className="notice"
                    onClick={() => {
                      setUpdateNumShow(true);
                    }}
                  >
                    ?
                  </span>
                </label>
                <UpdateNum
                  show={updateNumShow}
                  onHide={() => setUpdateNumShow(false)}
                />
                <InputGroup className="mb-3">
                  <FormControl className="mw-33" />
                  <InputGroup.Text>/</InputGroup.Text>
                  <Form.Select>
                    <option>Номенклатура</option>
                    {nomenclature.map((i) => (
                      <option key={i.id} value={i.value}>
                        {i.value}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>
              <div className="col-2">
                <label className="form-label">Дата та час надходження</label>
                <Flatpickr
                  data-enable-time
                  value={entryDate}
                  options={{
                    locale: {
                      ...uk,
                      firstDayOfWeek: 1,
                    },
                    dateFormat: "d-m-Y h:m",
                    time_24hr: true,
                  }}
                  className="form-control"
                  onChange={(date) => setEntryDate(date)}
                />
              </div>
              <div className="col-2">
                <label className="form-label">Номер та дата документу</label>
                <InputGroup className="mb-3">
                  <FormControl />
                  <Flatpickr
                    value={docDate}
                    options={{
                      locale: {
                        ...uk,
                        firstDayOfWeek: 1,
                      },
                      dateFormat: "d-m-Y",
                      time_24hr: true,
                    }}
                    className="form-control"
                    onChange={(date) => setDocDate(date)}
                  />
                </InputGroup>
              </div>
              <div className="col-5">
                <Input label="Короткий зміст" />
              </div>
              <div className="col-4">
                <Input label="Від кого" />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button variant="primary">Зберегти</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDocument;
