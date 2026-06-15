import React, { useState } from "react";
import "./AiFaultRatio.css"; // 분리한 CSS 파일 임포트
import { FcAdvance } from "react-icons/fc";

function AiFaultRatio() {
  // 사용자가 입력할 텍스트 상태 관리
  const [situation, setSituation] = useState(
    "신호 없는 교차로에서 직진 중인 A차량과 우측 도로에서 진입한 B차량이 충돌했습니다.",
  );
  const [accidentType, setAccidentType] = useState("");

  return (
    <div className="ai-fault-container">
      {/* 전체 대레이아웃 (2단 분할 구조 대비) */}
      <div className="grid-layout">
        {/* 좌측 영역: AI 과실비율 조회 (입력 + 결과) */}
        <div className="left-section">
          {/* 섹션 타이틀 */}
          <h2 className="section-title">AI 과실비율 조회</h2>

          {/* 입력창과 결과창 배치 */}
          <div className="flex-layout">
            
            {/* [좌측] 1. 사고 상황 입력 */}
            <div className="card-box">
              <div>
                <div className="card-header">
                  <span className="step-badge">1</span>
                  <h3 className="card-title">사고 상황 입력</h3>
                </div>

                {/* 텍스트 입력창 */}
                <div className="textarea-wrapper">
                  <textarea
                    value={situation}
                    onChange={(e) => setSituation(e.target.value.slice(0, 300))}
                    className="textarea-input"
                    placeholder="사고 상황을 입력하세요."
                  />
                  <span className="char-counter">
                    {situation.length} / 300자
                  </span>
                </div>

                {/* 사고 유형 선택 셀렉트 박스 */}
                <select
                  value={accidentType}
                  onChange={(e) => setAccidentType(e.target.value)}
                  className="select-input"
                >
                  <option value="">사고 유형 선택</option>
                  <option value="car-to-car">차량 대 차량</option>
                  <option value="car-to-person">차량 대 사람</option>
                  <option value="car-to-motorcycle">차량 대 이륜차</option>
                  <option value="car-to-bicycle">차량 대 자전거</option>
                  <option value="single-accident">단독사고</option>
                </select>
              </div>

              {/* 분석하기 버튼 */}
              <button className="submit-button">
                AI 분석하기
              </button>
            </div>

            {/* 중간에 위치하는 화살표 (PC 화면에서만 표시됨) */}
            <div className="arrow-divider"><FcAdvance /></div>

            {/* [우측] 2. AI 분석 결과 */}
            <div className="card-box">
              <div className="card-header">
                <span className="step-badge">2</span>
                <h3 className="card-title">AI 분석 결과</h3>
              </div>

              {/* 차트 & 퍼센트 영역 */}
              <div className="chart-container">
                {/* A 차량 결과 */}
                <div className="result-box">
                  <p className="ratio-percent blue">70%</p>
                  <p className="vehicle-info">A 차량 (직진)</p>
                </div>

                {/* 도넛 그래프 모양 원형 UI */}
                <div className="donut-chart">
                  <div className="donut-hole" />
                </div>

                {/* B 차량 결과 */}
                <div className="result-box">
                  <p className="ratio-percent red">30%</p>
                  <p className="vehicle-info">B 차량 (진입)</p>
                </div>
              </div>

              {/* 분석 요약 박스 */}
              <div className="summary-box">
                <h4 className="summary-title">분석 요약</h4>
                <p className="summary-text">
                  A 차량이 도로 우선권을 가지므로 B 차량의 과실이 더 큽니다.
                  <br />
                  단, 안전운전 의무에 따른 일부 과실이 인정됩니다.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 우측 영역 : 사고 대처 가이드 */}
        <div className="right-section">
          <h2 className="section-title">사고 대처 가이드</h2>
          
          <div className="guide-card">
            <ul className="guide-list">
              <li>
                <span className="guide-num">01</span>
                <div className="guide-content">
                  <h4>부상자 확인 및 안전 확보</h4>
                  <p>부상 여부 확인 후 안전한 장소로 이동</p>
                </div>
              </li>
              <li>
                <span className="guide-num">02</span>
                <div className="guide-content">
                  <h4>119 및 경찰 신고</h4>
                  <p>필요 시 119 신고 후 경찰(112)에 신고</p>
                </div>
              </li>
              <li>
                <span className="guide-num">03</span>
                <div className="guide-content">
                  <h4>현장 보존</h4>
                  <p>사고 현장을 보존하고 차량 이동 최소화</p>
                </div>
              </li>
              <li>
                <span className="guide-num">04</span>
                <div className="guide-content">
                  <h4>증거 사진 촬영</h4>
                  <p>사고 현장, 차량 파손 부위, 도로 상황 등 촬영</p>
                </div>
              </li>
              <li>
                <span className="guide-num">05</span>
                <div className="guide-content">
                  <h4>증상대방 정보 확인</h4>
                  <p>목격자 확보</p>
                </div>
              </li>
              <li>
                <span className="guide-num">06</span>
                <div className="guide-content">
                  <h4>목격자 확보</h4>
                  <p>목격자가 있다면 연락처 확보</p>
                </div>
              </li>
              <li>
                <span className="guide-num">07</span>
                <div className="guide-content">
                  <h4>보험사 접수</h4>
                  <p>보험사에 사고 접수 및 보상 상담 진행</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default AiFaultRatio;