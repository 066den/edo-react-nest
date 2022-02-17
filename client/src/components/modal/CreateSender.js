import { Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";

import "./modal.scss";
import {
  createSender,
  getSenders,
  updateSender,
} from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/reducers/appReducer";
import { useEffect } from "react";

const CreateSender = ({ show, onHide, senderId }) => {
  const dispatch = useDispatch();
  const senders = useSelector((state) => state.user.senders);

  const validationSchema = yup.object({
    name: yup.string().required("Поле обов'язкове"),
    email: yup
      .string()
      .email("Невірний формат пошти")
      .required("Пошта обов'язкова"),
  });

  const fields = {
    name: "",
    email: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: fields,
    validationSchema: validationSchema,
    onSubmit: submit,
  });

  function submit(values, { resetForm, isSubmitting }) {
    if (senderId) {
      updateSender(values, senderId)
        .then((response) => dispatch(getSenders()))
        .catch();
    } else {
      createSender(values)
        .then((response) => {
          if (response) dispatch(setAlert(response));
        })
        .catch();
    }
    isSubmitting(false);
    resetForm(fields);
  }

  useEffect(() => {
    if (senderId) {
      const currentSender = senders.find((el) => el.id === senderId);
      formik.setValues(currentSender);
    }

    return () => {
      formik.resetForm(fields);
    };
  }, [senderId]);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Додати контрагента</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Control
              placeholder="Коротка назва"
              {...formik.getFieldProps("name")}
              isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              placeholder="Електронна пошта"
              {...formik.getFieldProps("email")}
              isInvalid={!!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Control
            className="mb-3"
            as="textarea"
            rows={2}
            placeholder="Додаткова інформація"
            {...formik.getFieldProps("description")}
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="primary" type="submit" disabled={false}>
            Додати
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateSender;
