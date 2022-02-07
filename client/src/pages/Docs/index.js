import { Outlet } from "react-router-dom";

const Documents = () => {
  return (
    <div className="content-body">
      <Outlet />
    </div>
  );
};

export default Documents;
