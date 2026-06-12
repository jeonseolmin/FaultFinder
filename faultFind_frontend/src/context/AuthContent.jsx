import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(
    !!localStorage.getItem("accessToken")
  );

  const [userInfo, setUserInfo] = useState(null);

  const login = async (token) => {
    localStorage.setItem("accessToken", token);

  const res = await axiosInstance.get(
    "faultfinder/users/me"
  );

  setUserInfo(res.data);
  setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);