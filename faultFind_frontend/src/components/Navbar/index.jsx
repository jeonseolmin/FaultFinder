import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContent";
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLogin, userInfo,logout} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    axiosInstance
      .get("/faultfinder/users/me")
      .then((res) => {
        console.log("현재 로그인 유저:", res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("accessToken");
        setUserInfo(null);
      });
  }, []);

  // *************
  // 함수 정의 시작
  // *************
  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");

    if (!confirmLogout) {
      return;
    }

    logout()

    navigate("/");
  };

  // ***********
  // 함수 정의 끝
  // ***********

  return (
    <nav className="navbar">
      {/* 로고 영역 */}
      <div className="navbar-logo">
        <a href="/">⚖️ FaultFinder</a>
        <span className="navbar-slogan">교통사고 법률 정보 사이트</span>
      </div>

      {/* 메뉴 링크 영역 */}
      <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <a href="/accidentguide">사고대처</a>
        </li>
        <li>
          <a href="/accidentcase">사고유형</a>
        </li>
        <li>
          <a href="/faultsearch">과실비율 조회</a>
        </li>
        <li>
          <a href="/community">커뮤니티</a>
        </li>
      </ul>

      {/* 회원가입/로그인 버튼 영역 */}
      <div className="navbar-auth">
        {isLogin ? (
          <>
            <span className="welcome-user">
              환영합니다 {userInfo?.userName}님
            </span>

            <button className="btn-login" onClick={() => navigate("/mypage")}>
              마이페이지
            </button>

            <button className="btn-signup" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button className="btn-login" onClick={() => navigate("/login")}>
              로그인
            </button>

            <button className="btn-signup" onClick={() => navigate("/signup")}>
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
