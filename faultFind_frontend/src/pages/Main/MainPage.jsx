import React from "react";

// 컴포넌트들 불러오기
import AiFaultRatio from "../../components/Body_AiFaultRatio/AiFaultRatio.jsx";
import QuickServices from "../../components/Body_QuickServices/QuickServices.jsx";
import PopularPostAndBest5 from "../../components/Body_PopularPostAndBest5/PopularPostAndBest5.jsx";

// 🌟 배경으로 쓸 사진 2장을 정확히 불러옵니다 (경로와 파일명은 유저님 환경에 맞게 수정!)
import bgLightCar from "../../images/header-bg.png"; // 첫 번째: 하늘색 자동차 사진
import bgDarkCity from "../../images/body.png";   // 두 번째: 어두운 야경 사진

export default function MainPage() {
  return (
    <div className="main-page-container">
      
      {/* 🚨 기존에 있던 {showHeader && <Header />} 는 위 공간만 낭비하고 있어서 삭제했습니다! */}
      {/* (맨 위 메뉴바는 어차피 App.jsx의 <Navbar />가 보여주고 있으니 걱정 안 하셔도 됩니다) */}

      {/* 🌟 1번 구역 (첫 번째 위치): 하늘색 자동차 배경 + AI 과실비율 조회 */}
      <div style={{
        backgroundImage: `url(${bgLightCar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 20px",   // 위아래 여백을 줘서 답답하지 않게
        minHeight: "500px"      // 내용이 적어도 사진이 너무 납작해지지 않게 최소 높이 고정
      }}>
        <AiFaultRatio />
      </div>

      {/* 🌟 2번 구역 (두 번째 위치): 어두운 야경 배경 + 자주 찾는 서비스 & 인기글 */}
      <div style={{
        backgroundImage: `url(${bgDarkCity})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 20px",
        minHeight: "600px"
      }}>
        <QuickServices />
        <PopularPostAndBest5 />
      </div>

    </div>
  );
}