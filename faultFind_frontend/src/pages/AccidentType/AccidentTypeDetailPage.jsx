import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

import LeftSidebar from '../../components/SideBar/LeftSideBar.jsx';
import '../../components/SideBar/Community.css';
import './AccidentTypeDetail.css';

export default function AccidentTypeDetailPage() {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const [cases, setCases] = useState([]); // 계층형 트리 데이터 구조 (MainCategoryDto[])
  const [loading, setLoading] = useState(true);

  const [activeTag, setActiveTag] = useState('전체');
  
  // 🌟 고유 키(인덱스 기반 조합)로 열림 상태를 관리할 수 있도록 초기화
  const [expandedMain, setExpandedMain] = useState({});
  const [expandedSub, setExpandedSub] = useState({});
  const [expandedSection, setExpandedSection] = useState({});
  const [expandedTitle, setExpandedTitle] = useState({});

  // 카테고리 태그 목록
  const subCategories = ['전체', '위반', '교차로', '추돌', '직진', '유턴', '적색', '황색', '녹색', '기타'];

  const getDbCategoryName = (urlType) => {
    switch(urlType) {
      case 'car-to-car': return '자동차 대 자동차/이륜차'; 
      case 'car-to-pedestrian': return '자동차 대 보행자';
      case 'car-to-motorcycle': return '자동차 대 자동차/이륜차';
      case 'car-to-bicycle': return '자동차 대 자전거';
      case 'single-accident': return '단독사고';
      case 'etc-accident': return '기타';
      default: return urlType;
    }
  };

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const dbCategory = getDbCategoryName(typeId);
        
        const response = await axiosInstance.get(`/api/accidents/category?category=${encodeURIComponent(dbCategory)}`);
        setCases(response.data || []);
      } catch (error) {
        console.error("사고 상황 데이터를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [typeId]);

  // 🌟 4단계 계층 데이터 구조용 필터링 로직
  const getFilteredTree = () => {
    if (!cases || cases.length === 0) return [];
    if (activeTag === '전체') return cases;

    const mainKeywords = ['위반', '교차로', '추돌', '직진', '유턴', '적색', '황색', '녹색'];

    return cases
      .map(main => {
        const filteredSubs = (main.subCategories || [])
          .map(sub => {
            const filteredSections = (sub.sectionCategories || [])
              .map(section => {
                const filteredTitles = (section.titles || []).filter(t => {
                  if (activeTag === '기타') {
                    return !mainKeywords.some(keyword => t.title && t.title.includes(keyword));
                  }
                  return t.title && t.title.includes(activeTag);
                });
                return { ...section, titles: filteredTitles };
              })
              .filter(section => section.titles && section.titles.length > 0);
            return { ...sub, sectionCategories: filteredSections };
          })
          .filter(sub => sub.sectionCategories && sub.sectionCategories.length > 0);
        return { ...main, subCategories: filteredSubs };
      })
      .filter(main => main.subCategories && main.subCategories.length > 0);
  };

  // 🌟 아코디언 상태 토글 함수 수정 (고유 Key 문자열을 그대로 전달받아 토글하도록 정돈)
  const toggleMain = (key) => setExpandedMain(p => ({ ...p, [key]: !p[key] }));
  const toggleSub = (key) => setExpandedSub(p => ({ ...p, [key]: !p[key] }));
  const toggleSection = (key) => setExpandedSection(p => ({ ...p, [key]: !p[key] }));
  const toggleTitle = (code) => setExpandedTitle(p => ({ ...p, [code]: !p[code] }));

  const getTitle = () => {
    switch(typeId) {
      case 'car-to-car': return '차량 대 차량 사고';
      case 'car-to-pedestrian': return '차량 대 보행자 사고';
      case 'car-to-motorcycle': return '차량 대 이륜차 사고';
      case 'car-to-bicycle': return '차량 대 자전거 사고';
      case 'single-accident': return '단독 사고';
      case 'etc-accident': return '기타 사고';
      default: return '사고유형 상세';
    }
  };

  const filteredTree = getFilteredTree();

  return (
    <div className="community-page">
      <main className="main-container">
        
        <LeftSidebar activeTab="type" />

        <div className="type-detail-container">
          <div className="detail-header">
            <h2>{getTitle()}</h2>
          </div>

          <div className="info-notice-box">
            <p><span className="highlight">본인과 가장 유사한 사고 상황</span>을 찾아보세요.</p>
            <p>제시된 판례와 기본 과실 비율을 참고할 수 있습니다.</p>
            <p>※ 실제 사고 정황에 따라 최종 비율은 달라질 수 있습니다.</p>
          </div>

          {/* 태그 버튼 영역 */}
          <div className="tag-filter-container">
            {subCategories.map(tag => (
              <button 
                key={tag} 
                className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
                onClick={() => {
                  setActiveTag(tag);
                  setExpandedMain({});
                  setExpandedSub({});
                  setExpandedSection({});
                  setExpandedTitle({});
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 🌟 4단계 중첩 아코디언 리스트 출력 */}
          <div className="scenario-list">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#1a56db' }}>
                데이터를 불러오는 중입니다...
              </div>
            ) : filteredTree.length > 0 ? (
              filteredTree.map((main, mIdx) => {
                const mainKey = `main-${mIdx}`;
                const hasMainTitle = main.mainTitle && main.mainTitle.trim() !== "";

                // 대분류 제목이 없으면 껍데기를 건너뛰고 자식들을 바로 보여주는 내부 렌더러 함수
                const renderMainContent = () => (
                  (main.subCategories || []).map((sub, sIdx) => {
                    const subKey = `main-${mIdx}-sub-${sIdx}`;
                    const hasSubTitle = sub.subTitle && sub.subTitle.trim() !== "";

                    // 중분류 제목이 없으면 껍데기를 패스하고 소분류로 바로 진입
                    const renderSubContent = () => (
                      (sub.sectionCategories || []).map((section, secIdx) => {
                        const secKey = `main-${mIdx}-sub-${sIdx}-sec-${secIdx}`;
                        const hasSecTitle = section.sectionTitle && section.sectionTitle.trim() !== "";

                        // 소분류 제목이 없으면 최종 카드 목록만 바로 렌더링
                        const renderSecContent = () => (
                          (section.titles || []).map((scenario) => (
                            <div key={scenario.caseCode} className="scenario-card depth-4">
                              {/* 4단계 최종 타이틀 */}
                              <div className="scenario-header" onClick={() => toggleTitle(scenario.caseCode)}>
                                <span className="case-code-badge">{scenario.caseCode}</span>
                                <h6>{scenario.title || "제목 없음"}</h6>
                                <span className={`toggle-icon ${expandedTitle[scenario.caseCode] ? 'open' : ''}`}>▼</span>
                              </div>

                              {/* 최종 알맹이 내용 (상세 정보) */}
                              {expandedTitle[scenario.caseCode] && (
                                <div className="scenario-body">

                                  {/* 🌟 동적 이미지 추가 영역 */}
    <div className="scenario-image-container" style={{ textAlign: 'center', marginBottom: '15px' }}>
      <img 
        src={`/src/images/AccidentTypeCase/${scenario.caseCode}.jpg`} 
        alt={`${scenario.caseCode} 사고 상황도`}
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}
        onError={(e) => {
          // 혹시 DB의 caseCode와 매칭되는 파일이 폴더에 없으면 엑박 뜨지 않고 영역을 숨깁니다.
          e.target.style.display = 'none'; 
        }}
      />
    </div>


                                  <div className="party-info">
                                    <p><strong>A차량 (혹은 보행자):</strong> {scenario.partyAName}</p>
                                    <p><strong>B차량:</strong> {scenario.partyBName}</p>
                                  </div>
                                  <div className="scenario-ratio">
                                    🅰 &ensp;{scenario.baseFaultA}&ensp; : &ensp;{scenario.baseFaultB} &ensp;🅱
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        );

                        // 소분류 분기 처리
                        if (!hasSecTitle) return <div key={secKey}>{renderSecContent()}</div>;

                        return (
                          <div key={secKey} className="accordion-depth-3">
                            <div className="accordion-trigger depth-3-trigger" onClick={() => toggleSection(secKey)}>
                              <h5>{section.sectionTitle}</h5>
                              <span className={`arrow-icon ${expandedSection[secKey] ? 'open' : ''}`}>▼</span>
                            </div>
                            {expandedSection[secKey] && (
                              <div className="accordion-content depth-3-content">
                                {renderSecContent()}
                              </div>
                            )}
                          </div>
                        );
                      })
                    );

                    // 중분류 분기 처리
                    if (!hasSubTitle) return <div key={subKey}>{renderSubContent()}</div>;

                    return (
                      <div key={subKey} className="accordion-depth-2">
                        <div className="accordion-trigger depth-2-trigger" onClick={() => toggleSub(subKey)}>
                          <h4>{sub.subTitle}</h4>
                          <span className={`arrow-icon ${expandedSub[subKey] ? 'open' : ''}`}>▼</span>
                        </div>
                        {expandedSub[subKey] && (
                          <div className="accordion-content depth-2-content">
                            {renderSubContent()}
                          </div>
                        )}
                      </div>
                    );
                  })
                );

                // 대분류 분기 처리
                if (!hasMainTitle) return <div key={mainKey}>{renderMainContent()}</div>;

                return (
                  <div key={mainKey} className="accordion-depth-1">
                    <div className="accordion-trigger depth-1-trigger" onClick={() => toggleMain(mainKey)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="depth-bullet">▪</span> 
                        <h3>{main.mainTitle}</h3>
                      </div>
                      <span className={`arrow-icon ${expandedMain[mainKey] ? 'open' : ''}`}>▼</span>
                    </div>
                    {expandedMain[mainKey] && (
                      <div className="accordion-content depth-1-content">
                        {renderMainContent()}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                해당 카테고리에 등록된 사고 상황이 없습니다.
              </div>
            )}
          </div>
          
          <button 
            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          >
            ← 뒤로가기
          </button>
        </div>
      </main>
    </div>
  );
}