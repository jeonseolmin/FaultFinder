import { useState } from "react";
import LeftSidebar from "../../components/SideBar/LeftSideBar";
import "./FaultSearch.css";
import axiosInstance from "../../api/axiosInstance";

function FaultSearchPage() {
  const [situationText, setSituationText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const charCount = situationText.length;
  const [result, setResult] = useState(null);
  const mainOfficial = result?.official_chunks?.[0];
  const ratioA = mainOfficial?.base_fault_a ?? 50;
  const ratioB = mainOfficial?.base_fault_b ?? 50;


    const handleAnalyzeClick = async () => {

      console.log("1 버튼 클릭");

      if (!situationText.trim()) {
        alert("사고 상황을 입력해주세요.");
        return;
      }

      try {

        console.log("2 요청 시작");

        setIsAnalyzing(true);

        const response = await axiosInstance.post(
            "/faultfinder/ai/ask",
            {
              question: situationText,
              limit: 3,
            }
        );

        console.log("3 응답", response);

        setResult(response.data);

      } catch (e) {

        console.log("4 에러");
        console.error(e);

      } finally {

        console.log("5 finally");

        setIsAnalyzing(false);
      }
    }

    return (
        <div className="community-page">
          <main className="main-container">
            <LeftSidebar/>
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
                    <button
                        className="btn-analyze"
                        onClick={handleAnalyzeClick}
                        disabled={isAnalyzing}
                    >
                      {isAnalyzing ? '분석 중...' : 'AI 분석하기'}
                    </button>
                  </div>
                </div>


              </div>
              {isAnalyzing && (
                  <section className="ai-result-card">
                    <div className="ai-loading-box">
                      <div className="ai-loading-spinner"/>
                      <p>AI가 사고 상황을 분석하고 있습니다...</p>
                    </div>
                  </section>
              )}

              {result && !isAnalyzing && (
                  <section className="ai-result-card">
                    <div className="ai-result-header">
                      <div>
                        <h3>AI 분석 결과</h3>
                        <p>공식 인정기준과 유사 사례를 바탕으로 분석한 결과입니다.</p>
                      </div>
                      <span className="ai-result-badge">분석 완료</span>
                    </div>

                    <div className="ai-result-top">
                      <div className="ratio-panel">
                        <h4>예상 과실비율</h4>

                        <div className="ratio-content">
                          <div className="ratio-side ratio-a">
                            <span>A</span>
                            <strong>{ratioA}%</strong>
                          </div>

                          <div
                              className="donut-chart"
                              style={{
                                background: `conic-gradient(#ef4444 0 ${ratioA}%, #2563eb ${ratioA}% 100%)`,
                              }}
                          >
                            <div className="donut-inner">
                              <span>A : B</span>
                              <strong>
                                {ratioA} : {ratioB}
                              </strong>
                            </div>
                          </div>

                          <div className="ratio-side ratio-b">
                            <span>B</span>
                            <strong>{ratioB}%</strong>
                          </div>
                        </div>

                        <div className="ratio-legend">
          <span>
            <i className="legend-dot red"/> A 차량
          </span>
                          <span>
            <i className="legend-dot blue"/> B 차량
          </span>
                        </div>
                      </div>

                      <div className="summary-panel">
                        <h4>AI 분석 요약</h4>
                        <div className="summary-text">
                          {result.answer}
                        </div>
                      </div>
                    </div>

                    <div className="evidence-grid">
                      <div className="evidence-panel">
                        <div className="panel-title-row">
                          <h4>공식 인정기준</h4>
                          <span>Top {result.official_chunks?.length || 0}</span>
                        </div>

                        {result.official_chunks?.map((item) => (
                            <div className="evidence-item" key={item.case_code}>
                              <strong>{item.case_code}</strong>
                              <p>{item.title}</p>
                              <div className="fault-chip">
                                A {item.base_fault_a}% : B {item.base_fault_b}%
                              </div>
                            </div>
                        ))}
                      </div>

                      <div className="evidence-panel">
                        <div className="panel-title-row">
                          <h4>유사 사례</h4>
                          <span>한문철TV</span>
                        </div>

                        {result.youtube_chunks?.map((item) => (
                            <div className="youtube-item" key={item.id}>
                              <div className="play-icon">▶</div>
                              <p>{item.title}</p>
                              <strong>
                                {item.fault_ratio_a} : {item.fault_ratio_b}
                              </strong>
                            </div>
                        ))}
                      </div>
                    </div>

                    <div className="ai-notice">
                      위 분석 결과는 참고용이며, 실제 사고 상황에 따라 과실비율이 달라질 수 있습니다.
                    </div>
                  </section>
              )}
            </div>
          </main>
        </div>
    );
  }
export default FaultSearchPage;