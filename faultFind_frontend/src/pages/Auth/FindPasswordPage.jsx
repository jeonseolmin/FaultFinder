import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "../../components/Auth/Auth.css";

export default function FindPassword() {
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
        email: email,
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
    <div className="auth-split-layout">
      
      {/* 왼쪽 배너 영역 (비밀번호 찾기용 문구) */}
      <div className="auth-banner">
        <div className="banner-content">
          <h2>비밀번호를 잊으셨나요?<br/>걱정하지 마세요.</h2>
          <p>가입 시 등록한 정보로 안전하게 임시 비밀번호를 발급해 드립니다.</p>
        </div>
      </div>

      {/* 오른쪽 폼 영역 */}
      <div className="auth-form-section">
        <div className="auth-container">
          <div className="auth-card">
            
            <div className="auth-header">
              <h2>비밀번호 찾기</h2>
              <p>가입 시 등록한 이메일과 이름을 입력해주세요.</p>
            </div>

            {tempPassword ? (
              /* 임시 비밀번호 발급 성공 화면 */
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <h3 style={{ color: "#10b981", marginBottom: "15px" }}>본인 확인 완료</h3>
                <p style={{ color: "#4b5563", marginBottom: "10px" }}>회원님의 임시 비밀번호는</p>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444", letterSpacing: "5px", padding: "15px", backgroundColor: "#fef2f2", borderRadius: "8px", border: "1px dashed #f87171" }}>
                  {tempPassword}
                </div>
                <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "15px", wordBreak: "keep-all" }}>
                  ※ 로그인 후 반드시 마이페이지에서 비밀번호를 변경해주세요.
                </p>
                <button 
                  type="button" 
                  className="btn-submit" 
                  onClick={() => navigate("/login")}
                  style={{ marginTop: "20px" }}
                >
                  로그인하러 가기
                </button>
              </div>
            ) : (
              /* 발급 전 폼 화면 */
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
                  <label htmlFor="name">이름 (실명)</label>
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

            <div className="auth-links" style={{ marginTop: "28px" }}>
              <Link to="/login">로그인으로 돌아가기</Link>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}