import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSettings } from "../../redux/actions/user";
import Heading from "../../layouts/components/Heading";
import IconSvg from "../../components/Svg/IconSvg";
import { Nav, Tab } from "react-bootstrap";
import Users from "./Users";
import Departments from "./Departments";
import General from "./General";
import Roles from "./Roles";

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  return (
    <>
      <Heading title="Налаштування" />
      <div className="content-body">
        <Tab.Container defaultActiveKey="users">
          <Nav variant="pills" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="users">
                <IconSvg id="user" />
                <span className="fw-bold">Користувачі</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="departments">
                <IconSvg id="feather-box" />
                <span className="fw-bold">Відділи</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="roles">
                <IconSvg id="feather-box" />
                <span className="fw-bold">Ролі</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="general">
                <IconSvg id="feather-box" />
                <span className="fw-bold">Інщі</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="users">
              <Users />
            </Tab.Pane>
            <Tab.Pane eventKey="departments">
              <Departments />
            </Tab.Pane>
            <Tab.Pane eventKey="roles">
              <Roles />
            </Tab.Pane>
            <Tab.Pane eventKey="general">
              <General />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};

export default Settings;
