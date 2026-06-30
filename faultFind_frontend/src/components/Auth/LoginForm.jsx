import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContent";
import googleLogo from "../../images/logos/google_logo.svg";
import kakaoLogo from "../../images/logos/kakao_logo.svg";
import naverLogo from "../../images/logos/NAVER_login.png";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // *************
  // 함수 정의 시작
  // *************

  // 로컬 로그인 핸들러
  const handleLogin = async (e) => {
    e.preventDefault(); 
    
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

  const handleGoogleLogin = () => {
    window.location.href = "/oauth2/authorization/google";
  };

  const handleKakaoLogin = () => {
    window.location.href = "/oauth2/authorization/kakao";
  };

  const handleNaverLogin = () => {
    window.location.href = "/oauth2/authorization/naver";
  };

  // ***********
  // 함수 정의 끝
  // ***********

  return (
    /* 전체를 반으로 나누는 스플릿 레이아웃 컨테이너 */
    <div className="auth-split-layout">
      
      {/* 왼쪽: 배너 및 슬로건 영역 */}
      <div className="auth-banner">
        <div className="banner-content">
          <h2>사고의 순간,<br/>당신의 든든한 파트너</h2>
          <p>복잡한 과실비율 산정, FaultFinder가 명쾌하게 해결해 드립니다.</p>
        </div>
      </div>

      {/* 오른쪽: 로그인 폼 영역 */}
      <div className="auth-form-section">
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
            <form onSubmit={handleLogin}>
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

              <button type="submit" className="btn-submit">
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
      </div>

    </div>
  );
}