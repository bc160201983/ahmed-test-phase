import Cookies from "js-cookie";
import { useRouter } from "next/router";

const { createContext, useContext, useState, useEffect } = require("react");

const AppContext = createContext();

const getLocalStorage = () => {
  if (typeof window === "undefined") {
    return;
  }
  let user = Cookies.get("user");
  if (user) {
    return (user = JSON.parse(Cookies.get("user")));
  }
};
const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [pLoading, setPloading] = useState(false);
  const router = useRouter();

  const [alert, setAlert] = useState({ show: false, msg: "" });
  const [token, setToken] = useState({});

  const showAlert = (show = false, msg = "") => {
    setAlert({ show, msg });
  };
  const logout = () => {
    setUser(null);
    Cookies.remove("user");

    router.replace("/");
  };

  useEffect(() => {
    // setCurrentUser(getLocalStorage());
    const User = Cookies.get("user")
      ? JSON.parse(Cookies.get("user"))
      : Cookies.remove();
    setUser(User);
  }, []);

  // useEffect(() => {
  //   Cookies.set("user", JSON.stringify(currentUser));
  // }, [currentUser]);
  return (
    <AppContext.Provider
      value={{
        showAlert,
        alert,
        setToken,
        user,
        setUser,
        logout,
        setPloading,
        pLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
