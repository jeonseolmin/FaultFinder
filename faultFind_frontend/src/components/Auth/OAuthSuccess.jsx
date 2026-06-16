import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContent";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        alert("소셜 로그인에 실패했습니다.");
        navigate("/login");
        return;
      }

      try {
        await login(token);
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate("/login");
      }
    };

    handleOAuthLogin();
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">로그인 처리 중...</div>
    </div>
  );
}
