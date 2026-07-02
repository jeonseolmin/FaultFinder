import { useState } from "react";
import LeftSidebar from "../../components/SideBar/LeftSideBar";
import axiosInstance from "../../api/axiosInstance";
import "./FaultSearch.css";

function FaultSearchPage() {
  const [situationText, setSituationText] = useState("");
  const [accidentType, setAccidentType] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);


  const charCount = situationText.length;

  const mainOfficial = result?.official_chunks?.[0];

  const ratioA = mainOfficial?.base_fault_a ?? 50;
  const ratioB = mainOfficial?.base_fault_b ?? 50;

  const extractPartyName = (text, party) => {
    if (!text) return party === "A" ? "A측" : "B측";

    const regex = new RegExp(`당사자 ${party}:\\s*(.+)`);
    const match = text.match(regex);

    return match?.[1]?.trim() || `${party}측`;
  };

  const partyAName = mainOfficial?.party_a_name || "A";
  const partyBName = mainOfficial?.party_b_name || "B";

  const handleAnalyzeClick = async () => {
    if (!situationText.trim()) {
      alert("사고 상황을 입력해주세요.");
      return;
    }

    try {
      setIsAnalyzing(true);
      setResult(null);

      const response = await axiosInstance.post("/faultfinder/ai/ask", {
        question: situationText,
        limit: 3,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
      } else {
        alert("AI 분석 중 오류가 발생했습니다.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
      <div className="community-page">
        <main className="main-container">
          <LeftSidebar activeTab="ratio" />

          <div className="fault-search-container">
            <section className="search-hero">
              <h1>과실비율 AI 조회</h1>
              <p>
                사고 상황을 자연스럽게 입력하시면, AI가 공식 인정기준과 유사 사례를 분석하여 예상 과실비율을 알려드립니다.
              </p>
            </section>

            <div className="main-content-container">
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
                  <div className="char-counter">{charCount} / 300자</div>
                </div>

                <div className="input-controls">
                  <button
                      type="button"
                      className="btn-analyze"
                      onClick={handleAnalyzeClick}
                      disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "분석 중..." : "AI 분석하기"}
                  </button>
                </div>
              </div>
            </div>

            {isAnalyzing && (
                <section className="ai-loading-card">
                  <div className="ai-loading-spinner" />
                  <p>AI가 공식 인정기준과 유사 사례를 분석하고 있습니다...</p>
                </section>
            )}

            {result && !isAnalyzing && (
                <section className="ai-result-section">
                  <div className="ai-result-title-row">
                    <div>
                      <h2>AI 분석 결과</h2>
                      <p>공식 인정기준과 유사 사례를 바탕으로 분석한 결과입니다.</p>
                    </div>
                    <span className="complete-badge">분석 완료</span>
                  </div>

                  <div className="wide-ratio-card">
                    <h3>예상 과실비율</h3>

                    <div className="ratio-label-row">
                      <div className="ratio-label-a">
                        <span>A 측</span>
                        <strong>{ratioA}%</strong>
                      </div>

                      <div className="ratio-label-b">
                        <span>B 측</span>
                        <strong>{ratioB}%</strong>
                      </div>
                    </div>

                    <div className="ratio-bar-clean">
                      <div
                          className="ratio-fill-a"
                          style={{ flexGrow: Math.max(ratioA, 3) }}
                      />
                      <div
                          className="ratio-fill-b"
                          style={{ flexGrow: Math.max(ratioB, 3) }}
                      />
                    </div>

                    <div className="party-info-row">
                      <div className="party-info a">
                        <div className="party-circle">A</div>
                        <div>
                          <strong>A 측 정보</strong>
                          <p>{partyAName}</p>
                        </div>
                      </div>

                      <div className="party-divider" />

                      <div className="party-info b">
                        <div className="party-circle">B</div>
                        <div>
                          <strong>B 측 정보</strong>
                          <p>{partyBName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ai-summary-wide-card">
                    <h3>AI 분석 요약</h3>
                    <div className="ai-summary-content">{result.answer}</div>
                  </div>

                  <div className="result-bottom-grid">
                    <div className="result-list-card">
                      <div className="result-list-header">
                        <h3>공식 인정기준</h3>
                        <span>Top {result.official_chunks?.length || 0}</span>
                      </div>

                      {result.official_chunks?.map((item, index) => (
                          <div className="official-case-item" key={item.case_code}>
                            <div className="case-rank">{index + 1}</div>
                            <div className="case-content">
                              <div className="case-title-row">
                                <strong>{item.case_code}</strong>
                                <span>
                            A {item.base_fault_a}% : B {item.base_fault_b}%
                          </span>
                              </div>
                              <p>{item.title}</p>
                            </div>
                          </div>
                      ))}
                    </div>

                    <div className="result-list-card">
                      <div className="result-list-header">
                        <h3>유사 사례</h3>
                        <span>한문철TV</span>
                      </div>

                      {result.youtube_chunks?.length > 0 ? (
                          result.youtube_chunks.map((item) => (
                              <div className="youtube-case-item" key={item.id}>
                                <div className="play-circle">▶</div>
                                <p>{item.title}</p>
                                <strong>
                                  {item.fault_ratio_a} : {item.fault_ratio_b}
                                </strong>
                              </div>
                          ))
                      ) : (
                          <div className="empty-case">유사 사례가 없습니다.</div>
                      )}
                    </div>
                  </div>

                  <div className="ai-notice">
                    본 분석 결과는 참고용이며, 실제 사고 상황과 증거에 따라 과실비율이 달라질 수 있습니다.
                  </div>
                </section>
            )}
          </div>
        </main>
      </div>
  );
}

export default FaultSearchPage;