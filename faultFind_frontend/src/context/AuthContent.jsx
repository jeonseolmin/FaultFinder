import { createContext, useContext, useState,useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("accessToken"));

  const [userInfo, setUserInfo] = useState(null);

  const login = async (token) => {
    localStorage.setItem("accessToken", token);

    const res = await axiosInstance.get("/api/users/me");

    setUserInfo(res.data);
    setIsLogin(true);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        setUserInfo(res.data);
        setIsLogin(true);
      })
      .catch(() => {
        logout();
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLogin(false);
    setUserInfo(null)
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
