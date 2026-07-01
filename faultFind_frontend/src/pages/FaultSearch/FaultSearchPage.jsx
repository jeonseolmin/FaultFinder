import React, { useState } from "react";
import LeftSidebar from "../../components/SideBar/LeftSideBar";
import "./FaultSearch.css";

function FaultSearchPage() {
  const [situationText, setSituationText] = useState("");
  const [accidentType, setAccidentType] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const charCount = situationText.length;

  const handleAnalyzeClick = () => {
    if (!situationText.trim()) {
      alert("사고 상황을 입력해주세요.");
      return;
    }
    
    setIsAnalyzing(true);
    setShowResult(false);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="community-page">
      <main className="main-container">
        <LeftSidebar activeTab="ratio" />
        
        <div className="fault-search-container">
          <section className="search-hero">
            <h1>과실비율 AI 조회</h1>
            <p>
              사고 상황을 자연스럽게 입력하시면, AI가 유사 판례를 분석하여 예상 과실비율을 알려드립니다.
            </p>
          </section>

          <div className="main-content-container">
            {/* 🟢 왼쪽: AI 사고 상황 입력 창 */}
            <div className="section-input">
              <h3>
                <span className="section-number">1</span>
                AI 사고 상황 입력
              </h3>
              
              <div className="input-box">
                <textarea 
                  value={situationText}
                  onChange={(e) => setSituationText(e.target.value)}
                  placeholder="예) 신호 없는 교차로에서 직진 중인 A차량과 우측 도로에서 진입한 B차량이 충돌했습니다."
                  maxLength={300}
                />
                <div className="char-counter">
                  {charCount} / 300자
                </div>
              </div>

              <div className="input-controls">
                <select 
                  value={accidentType}
                  onChange={(e) => setAccidentType(e.target.value)}
                  className="accident-select"
                >
                  <option value="">사고 유형 선택 (선택)</option>
                  <option value="car_to_car">차량 대 차량</option>
                  <option value="car_to_human">차량 대 보행자</option>
                  <option value="car_to_motorcycle">차량 대 이륜차</option>
                  <option value="car_to_bicycle">차량 대 자전거</option>
                </select>
                <button 
                  className="btn-analyze"
                  onClick={handleAnalyzeClick}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? '분석 중...' : 'AI 분석하기'}
                </button>
              </div>
            </div>

            {/* 🔵 오른쪽: AI 분석 결과 창 */}
            <div className="card-box">
              <h3 className="card-title">
                <span className="section-number">2</span>
                AI 분석 결과
              </h3>

              {!showResult && !isAnalyzing && (
                <div className="status-placeholder">
                  왼쪽에서 사고 상황을 입력하고 분석을 시작해보세요.
                </div>
              )}

              {isAnalyzing && (
                <div className="status-loading">
                  🔍 AI가 판례와 법률을 바탕으로 과실비율을 계산하고 있습니다...
                </div>
              )}

              {showResult && (
                <div className="result-wrapper">
                  {/* 도넛 차트 및 퍼센트 영역 */}
                  <div className="chart-container">
                    <div className="chart-info">
                      <div className="percent-blue">70%</div>
                      <div className="label">A 차량 (직진)</div>
                    </div>

                    <div className="donut-graph">
                      <div className="donut-center"></div>
                    </div>

                    <div className="chart-info">
                      <div className="percent-red">30%</div>
                      <div className="label">B 차량 (진입)</div>
                    </div>
                  </div>

                  {/* 분석 요약 텍스트 */}
                  <div className="summary-box">
                    <h4>분석 요약</h4>
                    <p>
                      A 차량이 도로 우선권을 가지므로 B 차량의 과실이 더 큽니다. 단, 안전운전 의무에 따른 일부 과실이 인정됩니다.
                    </p>
                  </div>

                  {/* 4개의 하단 액션 버튼 */}
                  <div className="action-buttons">
                    {['상세 분석 보기', '관련 판례 보기', '관련 법률 보기', '보험처리 가이드'].map((btnText, idx) => (
                      <button key={idx} className="btn-action">
                        <span className="icon">📄</span>
                        {btnText}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FaultSearchPage;