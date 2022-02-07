import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { Ukrainian as uk } from "flatpickr/dist/l10n/uk.js";
import Heading from "../../../layouts/components/Heading";
import Input from "../../../lib/Input";
import UpdateNum from "../../../lib/modal/UpdateNum";
import { useDispatch, useSelector } from "react-redux";
import { getNomenclature } from "../../../actions/documents";

const AddDocument = () => {
  const [picker, setPicker] = useState(new Date());
  const [updateNumShow, setUpdateNumShow] = useState(false);
  const dispatch = useDispatch();
  const { nomenclature } = useSelector((state) => state.doc);

  useEffect(() => {
    dispatch(getNomenclature());
  }, [dispatch]);

  return (
    <>
      <Heading title="Новий документ" />
      <div className="card">
        <div className="card-body">
          <Form>
            <div className="row">
              <div className="col-7">
                <div className="row g-2">
                  <div className="col-4">
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
                      nomenclature={nomenclature}
                    />
                    <InputGroup className="mb-3">
                      <FormControl className="mw-25" />
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
                  <div className="col-8">
                    <Input label="Назва*" />
                  </div>
                  <div className="col-3">
                    <label className="form-label">Дата та час</label>
                    <Flatpickr
                      data-enable-time
                      value={picker}
                      options={{
                        locale: {
                          ...uk,
                          firstDayOfWeek: 1,
                        },
                        dateFormat: "d-m-Y h:m",
                        time_24hr: true,
                      }}
                      className="form-control"
                      onChange={(date) => setPicker(date)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default AddDocument;
