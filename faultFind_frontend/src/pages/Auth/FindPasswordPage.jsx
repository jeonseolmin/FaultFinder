import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
import "../../components/Auth/Auth.css";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tempPassword, setTempPassword] = useState(null);
  const navigate = useNavigate();

  const handleFindPassword = async (e) => {
    e.preventDefault();

    if (!email || !name) {
      alert("이메일과 이름을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/users/find-password", {
        email,
        userName: name,
      });

      setTempPassword(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>비밀번호 찾기</h2>
            <p>가입 시 등록한 이메일과 이름을 입력해주세요.</p>
          </div>

          {tempPassword ? (
              <div className="password-result">
                <h3 className="password-result-title">✅ 본인 확인 완료</h3>

                <p className="password-result-desc">
                  회원님의 임시 비밀번호는
                </p>

                <div className="temp-password-box">
                  {tempPassword}
                </div>

                <p className="temp-password-notice">
                  ※ 로그인 후 반드시 마이페이지에서 비밀번호를 변경해주세요.
                </p>

                <button
                    type="button"
                    className="btn-submit btn-login-move"
                    onClick={() => navigate("/login")}
                >
                  로그인하러 가기
                </button>
              </div>
          ) : (
              <form onSubmit={handleFindPassword}>
                <div className="input-group">
                  <label htmlFor="email">이메일</label>
                  <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="가입하신 이메일을 입력하세요"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="name">이름 (닉네임)</label>
                  <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="가입하신 이름을 입력하세요"
                  />
                </div>

                <button type="submit" className="btn-submit">
                  임시 비밀번호 발급
                </button>
              </form>
          )}

          <div className="auth-links auth-links-bottom">
            <Link to="/login">로그인으로 돌아가기</Link>
          </div>
        </div>
      </div>
  );
}