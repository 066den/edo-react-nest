import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { registration } from "../../../actions/user";
import Loading from "../../../layouts/components/Loading";
import Input from "../../../lib/Input";
import Select from "../../../lib/Select";

const Register = () => {
  const [form, setForm] = useState({});

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { dataRegister, departments, roles } = useSelector(
    (state) => state.user
  );

  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    setForm({ ...dataRegister, password: "" });
  }, [dataRegister]);

  return (
    <form>
      {loading && <Loading />}
      <Input
        name="full_name"
        value={form.full_name}
        type="text"
        placeholder="Прізвище, ініціали"
        setValue={changeHandler}
      />
      <Input
        name="email"
        value={form.email}
        type="email"
        placeholder="Email"
        setValue={changeHandler}
      />

      <Input
        label="Пароль"
        name="password"
        value={form.password}
        type="password"
        placeholder="........"
        setValue={changeHandler}
      />

      <Input
        name="post"
        value={form.post}
        type="text"
        placeholder="Посада"
        setValue={changeHandler}
      />

      <Select
        label="Відділ"
        id="department"
        name="departmentId"
        setValue={changeHandler}
        value={form.departmentId}
      >
        <option value="">--виберіть--</option>
        {departments.map((dep) => (
          <option key={dep.id} value={dep.id}>
            {dep.description}
          </option>
        ))}
      </Select>

      <Select
        label="Роль"
        id="role"
        name="roleId"
        setValue={changeHandler}
        value={form.roleId}
      >
        <option value="">--виберіть--</option>
        {roles
          .filter((e) => e.value !== "ADMIN")
          .map((role) => (
            <option key={role.id} value={role.id}>
              {role.description}
            </option>
          ))}
      </Select>

      <button
        className="btn btn-primary me-1 data-submit"
        onClick={() => registration({ ...form })}
      >
        {dataRegister.id ? "Редагувати" : "Зареєструвати"}
      </button>
    </form>
  );
};

export default Register;
