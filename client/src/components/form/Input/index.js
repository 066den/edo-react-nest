import "./input.scss";
const Input = (props) => {
  const { label, name, value, type, placeholder, onChange } = props;

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}

      <input
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
