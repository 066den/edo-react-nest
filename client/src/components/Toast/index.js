import { ToastContainer, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { delAlert } from "../../redux/reducers/appReducer";
import IconSvg from "../Svg/IconSvg";
import "./toast.scss";

const Toasts = () => {
  const alerts = useSelector((state) => state.app.alerts);
  const dispatch = useDispatch();

  const closeAlert = (id) => {
    dispatch(delAlert(id));
  };

  return (
    <ToastContainer>
      {alerts.map((item) => (
        <Toast
          key={item.id}
          onClose={() => closeAlert(item.id)}
          data-status={item.statusCode}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto"></strong>
          </Toast.Header>
          <Toast.Body>{item.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default Toasts;
