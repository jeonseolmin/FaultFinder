import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

import LeftSidebar from '../../components/SideBar/LeftSideBar.jsx';
import '../../components/SideBar/Community.css';
import './AccidentTypeDetail.css';

export default function AccidentTypeDetailPage() {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTag, setActiveTag] = useState('전체');
  const [expandedId, setExpandedId] = useState(null);

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
        setCases(response.data);
      } catch (error) {
        console.error("사고 상황 데이터를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [typeId]);

  // 🌟 태그 필터링 로직: 선택된 태그 단어가 제목에 포함된 것만 골라냅니다.
  const filteredCases = cases.filter((scenario) => {
    if (activeTag === '전체') return true;
    
    // '기타'를 눌렀을 때는 주요 키워드가 없는 사고들만 모아서 보여줍니다.
    if (activeTag === '기타') {
      const mainKeywords = ['위반', '교차로', '추돌', '직진', '유턴', '적색', '황색', '녹색'];
      return !mainKeywords.some(keyword => scenario.title.includes(keyword));
    }
    
    return scenario.title.includes(activeTag);
  });

  // 아코디언 함수
  const toggleAccordion = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

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

          {/* 둥근 태그 버튼(Pill Button) 영역 추가 */}
          <div className="tag-filter-container">
            {subCategories.map(tag => (
              <button 
                key={tag} 
                className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
                onClick={() => {
                  setActiveTag(tag);
                  setExpandedId(null);
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 상황 리스트 출력 (아코디언 구조) */}
          <div className="scenario-list">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#1a56db' }}>
                데이터를 불러오는 중입니다...
              </div>
            ) : filteredCases.length > 0 ? (
              filteredCases.map((scenario) => (
                <div key={scenario.caseCode} className="scenario-card">
                  
                  {/* 카드의 윗부분 (항상 보임, 클릭 시 토글) */}
                  <div className="scenario-header" onClick={() => toggleAccordion(scenario.caseCode)}>
                    <h4>{scenario.title}</h4>
                    <span className={`toggle-icon ${expandedId === scenario.caseCode ? 'open' : ''}`}>▼</span>
                  </div>

                  {/* 카드의 아랫부분 (펼쳐졌을 때만 렌더링됨) */}
                  {expandedId === scenario.caseCode && (
                    <div className="scenario-body">
                      <div className="party-info">
                        <p><strong>A차량 (혹은 보행자):</strong> {scenario.partyAName}</p>
                        <p><strong>B차량:</strong> {scenario.partyBName}</p>
                      </div>
                      <div className="scenario-ratio">
                        기본 {scenario.baseFaultA} : {scenario.baseFaultB}
                      </div>
                    </div>
                  )}
                  
                </div>
              ))
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