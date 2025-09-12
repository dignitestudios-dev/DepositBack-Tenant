import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useFetchData } from "../hooks/api/Get";
import axios from "../axios";
import { ErrorToast } from "../components/global/Toaster";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState();
  const [token, setToken] = useState(() => Cookies.get("token"));

  const [userData, setUserData] = useState(() => {
    const cookieData = Cookies.get("user");
    return cookieData ? JSON.parse(cookieData) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const [notification, setNotification] = useState([]);

  const loginContext = (data) => {
    console.log("🚀 ~ loginContext ~ data:", data);
    if (data) {
      if (data?.token) {
        Cookies.set("token", data?.token);
        setToken(data?.token);
      }
      if (data?.user) {
        setUserData(data?.user);
        Cookies.set("user", JSON.stringify(data?.user));
      }
    }
  };

  const logoutContext = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUserData(null);
    navigate("/auth/login");
  };

  const handleNotifications = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/notification");
      console.log("🚀 ~ handleNotifications ~ data:", data);
      if (data.success) {
        setNotification(data.data);
        setIsLoading(false);
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      handleNotifications();
    }
  }, [update]);

  return (
    <AppContext.Provider
      value={{
        token,
        loginContext,
        logoutContext,
        userData,
        notification,
        isLoading,
        setUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
