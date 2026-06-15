import React from "react";
import LeftSidebar from "../../components/Community/LeftSideBar.jsx";
import RightSidebar from "../../components/Community/RightSideBar.jsx";
import "../../components/Community/Community.css";
import "../../components/FaultSearch/FaultSearch.css";

function FaultSearch() {
  return (
    <div className="community-page">
      <main className="main-container">
        {/* 왼쪽 사이드바 */}
        <LeftSidebar activeTab="ratio" />
        {/* 가운데 내용 */}
        <div className="fault-search-container">
          <section className="search-hero">
            <h1>과실비율 조회</h1>
            <p>
              사고 유형과 상황을 선택하면 예상 과실비율을 확인할 수 있습니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
export default FaultSearch;
