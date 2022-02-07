import { useEffect } from "react";
import { useSelector } from "react-redux";

const DepList = () => {
  const deps = useSelector((state) => state.user.departments);

  return (
    <tbody>
      {deps.map((item) => (
        <tr key={item.id}>
          <td>
            <span className="fw-bolder">{item.description}</span>
          </td>
          <td>{item.value}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default DepList;
