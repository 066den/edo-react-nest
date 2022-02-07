const Select = (props) => {
  const { label, name, value, onChange, children } = props;

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        className="form-select"
        id={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
