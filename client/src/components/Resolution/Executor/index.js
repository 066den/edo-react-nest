import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { CustomToggle } from "../../CustomToggle";
import IconSvg from "../../Svg/IconSvg";

const Executor = ({ id, name, delExecutor, addComment }) => {
  const formik = useFormik({
    initialValues: {
      task: [],
      comment: "",
    },
  });

  useEffect(() => {
    addComment(id, formik.values);
  }, [formik.values.task, formik.values.comment]);

  return (
    <div className="bg-light-secondary executor position-relative rounded mb-3 p-3">
      <button
        type="button"
        className="ms-1 btn-close"
        onClick={() => delExecutor(id)}
      ></button>
      <div className="row">
        <div className="col-8">
          <h4 className="mb-1 me-1 fw-bolder">{name}</h4>
          <div className="comment">
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0" className="mb-2">
                <h6 className="d-flex align-items-center fw-bolder">
                  <span className="me-50">Коментар</span>
                  <CustomToggle eventKey="0">
                    <IconSvg id="plus" w={18} h={18} />
                  </CustomToggle>
                </h6>
                <Accordion.Body>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    onBlur={formik.handleChange}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="col-4">
          <div className="executor-actions">
            <Form.Check
              type="checkbox"
              name="task"
              value="На виконання"
              onChange={formik.handleChange}
              label="На виконання"
            />
            <Form.Check
              type="checkbox"
              name="task"
              value="На ознайомлення"
              onChange={formik.handleChange}
              label="На ознайомлення"
            />
            <Form.Check
              type="checkbox"
              name="task"
              value="Надати відповідь"
              onChange={formik.handleChange}
              label="Надати відповідь"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Executor;
