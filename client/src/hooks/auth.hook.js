import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.userData);
    if (data) {
      setToken(data.token);
      setUser(data.user);
    }
  }, []);

  return { user, token };
};

export default useAuth;
