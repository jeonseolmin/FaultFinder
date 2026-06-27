import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://3.27.17.82:8080",
});

axiosInstance.interceptors.request.use((config) => {
  // 🌟 핵심: 혹시 다른 이름으로 저장되어 있을지 모르니 3가지 경우를 다 뒤져봅니다!
  const token = localStorage.getItem("Authorization") 
             || localStorage.getItem("accessToken") 
             || localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  } else {
    console.warn("⚠️ axios 요청에 담을 토큰을 로컬 스토리지에서 찾지 못했습니다!");
  }

  return config;
});

export default axiosInstance;