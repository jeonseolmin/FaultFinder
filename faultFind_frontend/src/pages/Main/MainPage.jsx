import React from "react";
import Header from "../../components/Header/Header.jsx";
import Body from "../../components/Body/index.jsx";
import QuickServices from "../../components/Body_QuickServices/QuickServices.jsx";
import AiFaultRatio from "../../components/Body_AiFaultRatio/AiFaultRatio.jsx";
import PopularPostAndBest5 from "../../components/Body_PopularPostAndBest5/PopularPostAndBest5.jsx";

export default function MainPage({ showHeader }) {
  return (
    <div className="main-page-container">
      {showHeader && <Header />}
      
      {/* 🌟 추가하고 싶은 메인 전용 사진들은 딱 '여기에만' 넣으세요! */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <img src="/내사진1.jpg" alt="메인 배너 1" style={{ maxWidth: "100%" }} />
      </div>

      <Body />
      <QuickServices />
      <AiFaultRatio />
      <PopularPostAndBest5 />
    </div>
  );
}