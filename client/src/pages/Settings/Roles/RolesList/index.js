import { useSelector } from "react-redux";

const RoleList = () => {
  const roles = useSelector((state) => state.user.roles);
  return (
    <tbody>
      {roles.map((item) => (
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

export default RoleList;
