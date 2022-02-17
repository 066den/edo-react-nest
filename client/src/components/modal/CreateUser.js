import { useFormik } from "formik";
import { useRef } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { SUPPORTED_FORMATS_IMG } from "../../config";
import { createUser, getUsers } from "../../redux/actions/user";
import Thumb from "../form/Thumb";
import IconSvg from "../Svg/IconSvg";

const validationSchema = yup.object({
  full_name: yup.string().required("Поле обов'язкове"),
  email: yup
    .string()
    .email("Невірний формат пошти")
    .required("Пошта обов'язкова"),
  avatar: yup
    .mixed()
    .test(
      "FILE_SIZE",
      "Файл дуже великий",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Невірний формат файлу",
      (value) =>
        !value || (value && SUPPORTED_FORMATS_IMG.includes(value?.type))
    ),
});

const CreateUser = ({ show, onHide }) => {
  const fileRef = useRef();
  const { departments, roles, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fields = {
    full_name: "",
    email: "",
    post: "",
    departmentId: "",
    roleId: "",
    avatar: null,
  };

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: fields,
    onSubmit: submit,
  });

  function submit(values, { resetForm, setSubmitting }) {
    const formData = new FormData();
    console.log(values);
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("post", values.post);
    formData.append("departmentId", values.departmentId);
    formData.append("roleId", values.roleId);
    formData.append("avatar", values.avatar);
    createUser(formData).then((response) => dispatch(getUsers()));

    setSubmitting(false);
    resetForm(fields);
    onHide();
  }

  const selectFile = (e) => {
    formik.setFieldValue("avatar", e.target.files[0]);
  };

  return (
    <Modal className="modal-slide-in" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Додати користувача</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Прізвище, ініціали</Form.Label>
            <Form.Control
              placeholder="Прізвище, ініціали"
              {...formik.getFieldProps("full_name")}
              isInvalid={!!formik.errors.full_name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Електронна пошта</Form.Label>
            <Form.Control
              placeholder="Email"
              {...formik.getFieldProps("email")}
              isInvalid={!!formik.errors.email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="........"
              {...formik.getFieldProps("password")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Посада</Form.Label>
            <Form.Control
              placeholder="Посада"
              {...formik.getFieldProps("post")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Відділ</Form.Label>
            <Form.Select {...formik.getFieldProps("departmentId")}>
              <option>--виберіть відділ--</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.description}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Роль</Form.Label>
            <Form.Select {...formik.getFieldProps("roleId")}>
              <option>--вибрати роль--</option>
              {roles
                .filter((e) => e.value !== "ADMIN")
                .map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.description}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <label className="form-label d-block">Аватар</label>
          <div className="file-upload" onClick={() => fileRef.current.click()}>
            <Thumb
              file={formik.values.avatar}
              className="uploaded-avatar rounded me-4"
            />
            <label className="upload-button rounded">
              <IconSvg id="upload" />
            </label>
            <FormControl
              type="file"
              ref={fileRef}
              isInvalid={!!formik.errors.avatar}
              onChange={selectFile}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.avatar}
            </Form.Control.Feedback>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Зареєструвати
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateUser;
