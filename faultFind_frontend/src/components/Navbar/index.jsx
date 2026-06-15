import React, { useState } from "react";
import "./Navbar.css";
import { FaUserTie } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContent";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLogin, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  // *************
  // 함수 정의 시작
  // *************
  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");

    if (!confirmLogout) {
      return;
    }

    logout();

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
          <Link to="/guides">사고대처</Link>
        </li>

        <li>
          <Link to="/cases">사고유형</Link>
        </li>

        <li>
          <Link to="/fault-ratios">과실비율 조회</Link>
        </li>

        <li>
          <Link to="/community">커뮤니티</Link>
        </li>
      </ul>

      {/* 회원가입/로그인 버튼 영역 */}
      <div className="navbar-auth">
        {isLogin ? (
          <>
            <span className="user">
              <FaUserTie className="user-icon"/> {userInfo?.userName}님
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
