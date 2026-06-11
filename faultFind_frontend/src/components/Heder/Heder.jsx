import React, { useState } from "react";
import Navbar from "../Navbar";
import "./Heder.css";

function Heder() {
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="Heder">
      {/* 메인 콘텐츠 영역 (왼쪽 정렬) */}
      <main className="main-content">
        <h1 className="main-title">
          교통사고, 정확한 법률 정보로 <br /> 바르게 해결하세요.
        </h1>
        <span className="Heder-slogan">
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
          <button className="trending-tag" onClick={()=>setSearchTerm}>후진 후 충돌</button>
          <button className="trending-tag" onClick={()=>setSearchTerm}>차선 변경 사고</button>
          <button className="trending-tag" onClick={()=>setSearchTerm}>주차장 접촉사고</button>
          <button className="trending-tag" onClick={()=>setSearchTerm}>보행자 사고</button>
          <button className="trending-tag" onClick={()=>setSearchTerm}>무단횡단 사고</button>
        </div>
      </main>
    </div>
  );
}

export default Heder;
