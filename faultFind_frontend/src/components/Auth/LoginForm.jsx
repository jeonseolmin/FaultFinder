import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContent";
import googleLogo from "../../images/google_logo.svg";
import kakaoLogo from "../../images/kakao_logo.svg";
import naverLogo from "../../images/NAVER_login.png";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // *************
  // 함수 정의 시작
  // *************

  // 로컬 로그인 핸들러
  const handleLogin = async () => {
    try {
      const result = await axiosInstance.post("/api/auth/login", {
        email: email,
        password: password,
      });

      const token = result.data;

      await login(token);
      console.log(localStorage.getItem("accessToken"));
      navigate("/");
    } catch (error) {
      console.log(error);

      alert("로그인 실패");
    }
  };

  // 구글 로그인 핸들러
  const handleGoogleLogin = () => {
    window.location.href = 
    "http://localhost:8080/oauth2/authorization/google";
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    window.location.href = 
    "http://localhost:8080/oauth2/authorization/kakao";
  };

  // 네이버 로그인 핸들러
  const handleNaverLogin = () => {
  window.location.href =
    "http://localhost:8080/oauth2/authorization/naver";
};





  // ***********
  // 함수 정의 끝
  // ***********

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>로그인</h2>
          <p>FaultFinder 서비스 이용을 위해 로그인해주세요.</p>
        </div>
        {/* 소셜로그인 버튼 */}
        <div className="social-login">
          <button type="button" className="social-btn google" onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google" />
          </button>

          <button type="button" className="social-btn kakao" onClick={handleKakaoLogin}>
            <img src={kakaoLogo} alt="Kakao" />
          </button>

          <button type="button" className="social-btn naver"  onClick={handleNaverLogin}>
            <img src={naverLogo} alt="Naver" />
          </button>
        </div>

        {/* 로컬 로그인 */}
        <form>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button type="button" className="btn-submit" onClick={handleLogin}>
            로그인
          </button>
        </form>

        <div className="auth-links">
          <Link to="/find-password">비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
