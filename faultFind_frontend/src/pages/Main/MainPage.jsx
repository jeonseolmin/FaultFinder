import React from "react";

// 컴포넌트들 불러오기
import AiFaultRatio from "../../components/Body_AiFaultRatio/AiFaultRatio.jsx";
import QuickServices from "../../components/Body_QuickServices/QuickServices.jsx";
import PopularPostAndBest5 from "../../components/Body_PopularPostAndBest5/PopularPostAndBest5.jsx";

// 배경으로 쓸 사진 2장을 정확히 불러옵니다
import bgLightCar from "../../images/header-bg.png"; // 첫 번째: 하늘색 자동차 사진
import bgDarkCity from "../../images/body.png"; // 두 번째: 어두운 야경 사진
import Footer from "../../components/Footer/Footer.jsx" 
export default function MainPage() {
  return (
    <div className="main-page-container">
      {/* 🚨 기존에 있던 {showHeader && <Header />} 는 위 공간만 낭비하고 있어서 삭제했습니다! */}
      {/* (맨 위 메뉴바는 어차피 App.jsx의 <Navbar />가 보여주고 있으니 걱정 안 하셔도 됩니다) */}

      {/* 1번 구역 (첫 번째 위치): 하늘색 자동차 배경 + AI 과실비율 조회 */}
      <div
        style={{
          backgroundImage: `url(${bgLightCar})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          maxWidth: "100vw",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth:
              "1200px",
            margin: "0 auto",
            padding:
              "80px 20px" ,
          }}
        >
          <AiFaultRatio />
        </div>
      </div>
      <Footer />
      
    </div>
  );
}
