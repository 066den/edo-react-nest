import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./../components/Navbar";
import Header from "./../components/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <ToastContainer hideProgressBar />
      <Header />
      <Navbar />
      <div className="app-content content">
        <div className="content-wrapper">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
