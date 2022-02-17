import "./global.scss";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Login from "./pages/AuthPage/Login";
import MainLayout from "./layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./redux/actions/user";

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    dispatch(auth());
  }, []);

  if (!isAuth) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <MainLayout>
        <Router />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
