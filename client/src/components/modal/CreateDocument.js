import { useCallback, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNomenclature } from "../../redux/actions/documents";
import Flatpickr from "react-flatpickr";
import { Ukrainian as uk } from "flatpickr/dist/l10n/uk.js";
import * as yup from "yup";
import "./modal.scss";
import UpdateNum from "./UpdateNum";
import IconSvg from "../Svg/IconSvg";
import SelectSender from "./SelectSender";
import { useFormik } from "formik";
import { selectSender } from "../../redux/reducers/userReducer";
import Resolution from "../Resolution";
import SelectUser from "./SelectUser";

const validationSchema = yup.object({});

const fields = {
  number: "",
  title: "",
  nomenclature: "",
  entryDate: "",
  docDate: "",
  description: "",
  sender: "",
};

const CreateDocument = ({ show, onHide, title }) => {
  const [updateNumShow, setUpdateNumShow] = useState(false);
  const dispatch = useDispatch();
  const { nomenclature } = useSelector((state) => state.doc);
  const [addSendersShow, setAddSendersShow] = useState(false);
  const [selectUserShow, setSelectUserShow] = useState(false);
  const [executors, setExecutors] = useState([]);
  console.log(executors);

  const formik = useFormik({
    initialValues: fields,
    validationSchema: validationSchema,
    onSubmit: submit,
  });

  function submit(values, { resetForm, setSubmitting }) {
    //setSubmitting(false);
    //resetForm(fields);
  }

  const sender = useSelector((state) => state.user.selectSender);

  const hendleSelectSender = useCallback(() => {
    if (sender) {
      formik.setFieldValue("sender", sender.name);
    }
  }, [sender]);

  const clearSenderField = useCallback(() => {
    dispatch(selectSender());
    formik.setFieldValue("sender", "");
  }, []);

  useEffect(() => {
    dispatch(getNomenclature());
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      dialogClassName="modal-dialog-scrollable"
    >
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
                  <Form.Select {...formik.getFieldProps("nomenclature")}>
                    <option>Номенклатура</option>
                    {nomenclature.map((i) => (
                      <option key={i.id} value={i.value}>
                        {i.value}
                      </option>
                    ))}
                  </Form.Select>
                  <InputGroup.Text>/</InputGroup.Text>
                  <Form.Control
                    {...formik.getFieldProps("number")}
                    className="mw-33"
                  />
                </InputGroup>
              </div>
              <div className="col-auto">
                <label className="form-label">Дата та час надходження</label>
                <Flatpickr
                  data-enable-time
                  value={formik.values.entryDate}
                  onChange={(date) => formik.setFieldValue("entryDate", date)}
                  options={{
                    locale: {
                      ...uk,
                      firstDayOfWeek: 1,
                    },
                    dateFormat: "d.m.Y h:m",
                    time_24hr: true,
                  }}
                  className="form-control"
                />
              </div>
              <div className="col">
                <label className="form-label">Дата та номер документу</label>
                <InputGroup className="mb-3">
                  <Flatpickr
                    value={formik.values.docDate}
                    onChange={(date) => formik.setFieldValue("docDate", date)}
                    options={{
                      locale: {
                        ...uk,
                        firstDayOfWeek: 1,
                      },
                      dateFormat: "d.m.Y",
                      time_24hr: true,
                    }}
                    className="form-control"
                  />
                  <InputGroup.Text>№</InputGroup.Text>
                  <Form.Control
                    name="title"
                    {...formik.getFieldProps("title")}
                  />
                </InputGroup>
              </div>
              <div className="col-5">
                <label className="form-label">Короткий зміст</label>
                <Form.Control />
              </div>
              <div className="col-6">
                <label className="form-label">Від кого</label>
                <InputGroup className="mb-4">
                  <Form.Control
                    readOnly
                    placeholder="Для вибору натисніть &middot;&middot;&middot;"
                    {...formik.getFieldProps("sender")}
                  />
                  <Button
                    variant="outline-custom"
                    onClick={() => setAddSendersShow(true)}
                  >
                    <IconSvg id="more-horizontal" w={20} h={20} />
                  </Button>
                  {formik.values.sender && (
                    <Button
                      variant="outline-custom"
                      onClick={() => clearSenderField()}
                    >
                      <IconSvg id="time" w={20} h={20} />
                    </Button>
                  )}
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <button
                  className="btn btn-outline-primary w-100 mb-3"
                  onClick={() => setSelectUserShow(true)}
                >
                  Додати виконавця
                </button>
                <SelectUser
                  show={selectUserShow}
                  onHide={() => setSelectUserShow(false)}
                  setExecutors={setExecutors}
                />
                <Resolution executors={executors} setExecutors={setExecutors} />
              </div>
            </div>
          </div>
        </div>
        <SelectSender
          show={addSendersShow}
          onHide={() => setAddSendersShow(false)}
          hendleSelectSender={hendleSelectSender}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <Button variant="primary">Зберегти</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDocument;
