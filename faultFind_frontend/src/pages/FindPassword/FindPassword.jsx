import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "../../components/Auth/Auth.css";

export default function FindPassword() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tempPassword, setTempPassword] = useState(null); // 발급받은 임시 비번 저장
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

      // 🌟 성공하면 서버가 준 4자리 비밀번호를 상태에 저장해서 화면에 보여줌!
      setTempPassword(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data); // "입력하신 정보와 일치하는 계정이 없습니다."
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

        {/* 🌟 임시 비밀번호가 발급되었을 때 보여줄 화면 */}
        {tempPassword ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <h3 style={{ color: "#10b981", marginBottom: "15px" }}>✅ 본인 확인 완료</h3>
            <p style={{ color: "#4b5563", marginBottom: "10px" }}>회원님의 임시 비밀번호는</p>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444", letterSpacing: "5px", padding: "15px", backgroundColor: "#fef2f2", borderRadius: "8px", border: "1px dashed #f87171" }}>
              {tempPassword}
            </div>
            <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "15px" }}>
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
          /* 🌟 아직 발급받기 전 입력 폼 */
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

        <div className="auth-links" style={{ marginTop: "20px" }}>
          <Link to="/login">로그인으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}