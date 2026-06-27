import React from "react";
import "./FaultFinderText.css";

function FaultFinderText() {
  return (
    <div className="faultFinderText-container">
      <h2 className="faultFinderText-title-main">Fault Finder</h2>
      <div className="info-grid">
        <div className="info-item">
          <h2  className="info-title">사고유형 조회</h2>
          <p>본인의 사고와 가장 유사한 사고 유형을 <br/>빠르게 찾을 수 있습니다.</p>
          <p className="info-highlight">
            교차로 사고, 차선 변경, 추돌 사고 등<br/> 다양한 사고 사례를 유형별로<br/>
            정리하여 제공합니다.
          </p>
          <p>
            실제 과실비율 인정기준을 기반으로 사고 상황을 확인할 수 있습니다.
          </p>
        </div>
        <div className="info-item">
          <h2  className="info-title">과실비율 분석</h2>
          <p>사고 상황에 따른 기본 과실비율을 <br/>조회할 수 있습니다.</p>
          <p>
            차량 대 차량, 차량 대 보행자, 차량 대 자전거 등 다양한 사고 유형을
            분석합니다.
          </p>
          <p className="info-highlight">과실비율 인정기준과 판례를 기반으로<br/> 정보를 제공합니다.</p>
          <br/>
        </div>
        <div className="info-item">
          <h2 className="info-title">사고 분석</h2>
          <p>사고 상황을 입력하면 AI가 유사 사고 사례를<br/> 분석합니다.</p>
          <p className="info-highlight">
            사고 내용과 과실 요소를 종합적으로 검토하여<br/> 참고 정보를 제공합니다.
          </p>
          <p>향후 블랙박스 영상 및 이미지 분석 기능도<br/> 지원 예정입니다.</p>
          <br/>
        </div>
        <div className="info-item">
          <h2  className="info-title">커뮤니티 & 상담</h2>
          <p>교통사고 경험을 공유하고<br/> 다양한 의견을 확인할 수 있습니다.</p>
          <p className="info-highlight">
            사고 처리 절차, 보험 처리, 합의 과정 등 <br/>실제 사례를 기반으로<br/> 정보를
            교류할 수 있습니다.
          </p>
          <p>궁금한 점은 커뮤니티를 통해 <br/>질문하고 답변을 받을 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default FaultFinderText;
