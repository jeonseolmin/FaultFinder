import { useState } from "react";
import LeftSidebar from "../../components/SideBar/LeftSideBar.jsx";
import "../../components/Community/Community.css";
import "./FaultSearch.css";

function FaultSearchPage() {
  // 상태 관리
  const [situationText, setSituationText] = useState("");
  const [accidentType, setAccidentType] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 글자 수 계산
  const charCount = situationText.length;

  // AI 분석 버튼 클릭 핸들러
  const handleAnalyzeClick = () => {
    if (!situationText.trim()) {
      alert("사고 상황을 입력해주세요.");
      return;
    }
    
    // 로딩 연출 (백엔드 벡터 검색 API가 연결될 자리)
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
        {/* 왼쪽 사이드바 */}
        <LeftSidebar activeTab="ratio" />
        
        {/* 가운데 메인 내용 */}
        <div className="fault-search-container">
          
          <section className="search-hero">
            <h1>과실비율 AI 조회</h1>
            <p>
              사고 상황을 자연스럽게 입력하시면, AI가 유사 판례를 분석하여 예상 과실비율을 알려드립니다.
            </p>
          </section>

          {/* AI 분석 컨테이너 (좌: 입력, 우: 결과) */}
          <div className="main-content-container">
            {/* 🟢 왼쪽: AI 사고 상황 입력 창 */}
            <div className="section-input">
              <h3>
                <span style={{ backgroundColor: '#1e3a8a', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', marginRight: '10px' }}>1</span>
                AI 사고 상황 입력
              </h3>
              
              <div className="input-box">
                <textarea 
                  value={situationText}
                  onChange={(e) => setSituationText(e.target.value)}
                  placeholder="예) 신호 없는 교차로에서 직진 중인 A차량과 우측 도로에서 진입한 B차량이 충돌했습니다."
                  style={{ width: '100%', height: '120px', border: 'none', resize: 'none', outline: 'none', fontSize: '13px', lineHeight: '1.5' }}
                  maxLength={300}
                />
                <div style={{ textAlign: 'right', fontSize: '0.85em', color: '#9ca3af', marginTop: '10px' }}>
                  {charCount} / 300자
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <select 
                  value={accidentType}
                  onChange={(e) => setAccidentType(e.target.value)}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '15px' }}
                >
                  <option value="">사고 유형 선택 (선택)</option>
                  <option value="car_to_car">차량 대 차량</option>
                  <option value="car_to_human">차량 대 보행자</option>
                  <option value="car_to_motorcycle">차량 대 이륜차</option>
                  <option value="car_to_bicycle">차량 대 자전거</option>
                </select>
                <button className="btn-analyze"
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
                <span style={{ backgroundColor: '#1e3a8a', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', marginRight: '10px' }}>2</span>
                AI 분석 결과
              </h3>

              {!showResult && !isAnalyzing && (
                <div style={{ fontSize: '14px',height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#9ca3af' }}>
                  왼쪽에서 사고 상황을 입력하고 분석을 시작해보세요.
                </div>
              )}

              {isAnalyzing && (
                <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#3b82f6', fontWeight: 'bold' }}>
                  🔍 AI가 판례와 법률을 바탕으로 과실비율을 계산하고 있습니다...
                </div>
              )}

              {showResult && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* 도넛 차트 및 퍼센트 영역 */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', marginBottom: '30px', marginTop: '27px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#3b82f6' }}>70%</div>
                      <div style={{ color: '#4b5563', fontSize: '13px' }}>A 차량 (직진)</div>
                    </div>

                    {/* CSS conic-gradient를 활용한 깔끔한 도넛 차트 */}
                    <div style={{ 
                      width: '120px', height: '120px', borderRadius: '50%', 
                      background: 'conic-gradient(#ef4444 0% 30%, #3b82f6 30% 100%)',
                      display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                      <div style={{ width: '80px', height: '80px', backgroundColor: '#fffbeb', borderRadius: '50%' }}></div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#ef4444' }}>30%</div>
                      <div style={{ color: '#4b5563', fontSize: '13px' }}>B 차량 (진입)</div>
                    </div>
                  </div>

                  {/* 분석 요약 텍스트 */}
                  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '3px solid #BCCCDC', marginBottom: '30px' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>분석 요약</h4>
                    <p style={{ margin: 0, fontSize: '15px', color: '#4b5563', lineHeight: '1.5' }}>
                      A 차량이 도로 우선권을 가지므로 B 차량의 과실이 더 큽니다. 단, 안전운전 의무에 따른 일부 과실이 인정됩니다.
                    </p>
                  </div>

                  {/* 4개의 하단 액션 버튼 */}
                  <div style={{ display: 'flex', gap: '13px', justifyContent: 'space-between', marginTop: 'auto' }}>
                    {['상세 분석 보기', '관련 판례 보기', '관련 법률 보기', '보험처리 가이드'].map((btnText, idx) => (
                      <button key={idx} style={{ flex: 1, padding: '15px 10px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85em', color: '#4b5563', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      >
                        <span style={{ fontSize: '1.5em' }}>📄</span>
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