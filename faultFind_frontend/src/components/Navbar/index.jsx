import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* 로고 영역 */}
      <div className="navbar-logo">
        <a href="/FaultFinder">⚖️ FaultFinder</a>
        <span className="navbar-slogan">교통사고 법률 정보 사이트</span>
      </div>

      {/* 메뉴 링크 영역 */}
      <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><a href="/accidentguide">사고대처</a></li>
        <li><a href="/accidentcase">사고유형</a></li>
        <li><a href="/faultsearch">과실비율 조회</a></li>
        <li><a href="/community">커뮤니티</a></li>
      </ul>

      {/* 회원가입/로그인 버튼 영역 */}
      <div className="navbar-auth">
        <button className="btn-login">로그인</button>
        <button className="btn-signup">회원가입</button>
      </div>
    </nav>
  );
}

export default Navbar;
