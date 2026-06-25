import { useState } from "react";
import "./Navbar.css";
import { FaUserTie } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContent.jsx";
import { HiUser } from "react-icons/hi2";

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
      {/* 로고/제목 영역 (왼쪽 배치용) */}
      <Link to="/" className="navbar-logo">
        FaultFinder
      </Link>

      {/* 메뉴 링크 영역 */}
      <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/guides">사고대처</Link>
        </li>

        <li className="dropdown">
          <Link to="/cases" className="dropdown-Link">
            사고유형
          </Link>
          {/* 마우스를 올렸을 때 나타날 하위 메뉴 */}
          <ul className="navbar-dropdown">
            <li>
              <Link to="/cases/car-to-car">차량 대 차량</Link>
            </li>
            <li>
              <Link to="/cases/car-to-pedestrian">차량 대 보행자</Link>
            </li>
            <li>
              <Link to="/cases/car-to-bike">차량 대 이륜차</Link>
            </li>
            <li>
              <Link to="/cases/car-to-bicycle">차량 대 자전거</Link>
            </li>
            <li>
              <Link to="/cases/single-accident">단독사고</Link>
            </li>
             <li>
              <Link to="/cases/etc-accident">기타사고</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/fault-ratios">과실비율 조회</Link>
        </li>

        <li className="dropdown">
          <Link to="/community" className="dropdown-Link">
            커뮤니티
          </Link>
          {/* 마우스를 올렸을 때 나타날 하위 메뉴 */}
          <ul className="navbar-dropdown">
            <li>
              <Link to="/community/free">자유게시판</Link>
            </li>
            <li>
              <Link to="/community/qna">Q&A</Link>
            </li>
            <li>
              <Link to="/community/review">사고후기</Link>
            </li>
          </ul>
        </li>
      </ul>

      {/* 회원가입/로그인 버튼 영역 */}
      <div className="navbar-auth">
        {isLogin ? (
          <>
            <span className="user">
              <FaUserTie className="user-icon" /> {userInfo?.userName} 님
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
            <span className="user">
              <HiUser className="user-icon" color="black" />
            </span>
            <button className="btn-login" onClick={() => navigate("/login")}>
              Login
            </button>

            <button className="btn-signup" onClick={() => navigate("/signup")}>
              SignUp
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
