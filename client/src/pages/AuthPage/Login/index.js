import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/user";
import Input from "../../../lib/Input";
import Select from "../../../lib/Select";

const Login = () => {
  const [full_name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="auth-wrapper">
      <div className="auth-inner my-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-3">
              Ласкаво просимо до Борiвської селищної ради 👋
            </h4>
            <p className="card-text mb-3">
              Будьласка, увійдіть в свій особовий кабінет
            </p>

            <Select
              label="Користувач"
              name="full_name"
              onChange={(e) => setName(e.target.value)}
              value={full_name}
            >
              <option value="">виберіть</option>
              <option value="Мельников Д.О.">Мельников Д.О.</option>
              <option value="Загальний">Загальний відділ</option>
            </Select>

            <Input
              label="Пароль"
              value={password}
              type="password"
              placeholder="........"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-grid gap-2">
              <button
                className="btn btn-primary w-100 waves-effect waves-float waves-light"
                onClick={() => dispatch(login({ full_name, password }))}
              >
                Ввійти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
