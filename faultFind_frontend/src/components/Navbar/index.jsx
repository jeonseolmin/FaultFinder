import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* 로고 영역 */}
      <div className="navbar-logo">
        <a href="/">⚖️ 교통사고 법률정보</a>
        <span className="navbar-slogan">정확한 정보로 현명한 선택을</span>
      </div>

      {/* 메뉴 링크 영역 */}
      <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><a href="/accident-type">사고유형</a></li>
        <li><a href="/fault-ratio">과실비율조회</a></li>
        <li><a href="/legal-info">법률정보</a></li>
        <li><a href="/precedents">판례검색</a></li>
        <li><a href="/counseling">상담신청</a></li>
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
