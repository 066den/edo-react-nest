import "./global.scss";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Login from "./pages/AuthPage/Login";
import MainLayout from "./layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./lib/Loading";
import { auth } from "./actions/user";
import useRequest from "./hooks/useRequest";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useRequest(auth);
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user.user));
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Произошла ошибка при загрузке данных</h1>;
  }

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
