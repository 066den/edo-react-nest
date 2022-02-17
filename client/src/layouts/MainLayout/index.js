import Navbar from "./../components/Navbar";
import Header from "./../components/Header";
import Toasts from "../../components/Toast";

const MainLayout = ({ children }) => {
  return (
    <>
      <Toasts />
      <Header />
      <Navbar />
      <div className="app-content content">
        <div className="content-wrapper">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
