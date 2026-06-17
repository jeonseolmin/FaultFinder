import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import bgImage from "../../images/header-bg.png";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // 🌟 핵심 포인트: 어드민 페이지로 시작하는 주소면, 헤더 영역 전체를 통째로 날려버립니다 (아무것도 그리지 않음)
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("검색어를 입력해 주세요.");
      return;
    }
    console.log(`검색어: ${searchTerm}`);
    // 라우터 처리
  };

  return (
    <div className="header"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: '10vh'
      }}
    >
      <main className="main-content">
        <h1 className="main-title">
          교통사고, 정확한 법률 정보로 <br /> 당신의 권리를 지키세요.
        </h1>
        
        <span className="header-slogan">
          사고 상황을 입력하면 과실비율부터 보상, 관련 법률까지 한 번에 확인 할
          수 있습니다.
        </span>
        <form className="form-container" onSubmit={handleSearchSubmit}>
          <input
            className="input-field"
            type="text"
            placeholder="예) 신호 없는 교차로에서 직진 중 충돌했어요."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="search-button" type="submit">
            검색
          </button>
        </form>
        <div className="trending-container">
          <span className="trending-label">인기 검색어</span>
          <button className="trending-tag" onClick={() => setSearchTerm("후진 후 충돌")}>후진 후 충돌</button>
          <button className="trending-tag" onClick={() => setSearchTerm("차선 변경 사고")}>차선 변경 사고</button>
          <button className="trending-tag" onClick={() => setSearchTerm("주차장 접촉사고")}>주차장 접촉사고</button>
          <button className="trending-tag" onClick={() => setSearchTerm("보행자 사고")}>보행자 사고</button>
          <button className="trending-tag" onClick={() => setSearchTerm("무단횡단 사고")}>무단횡단 사고</button>
        </div>
      </main>
    </div>
  );
}

export default Header;