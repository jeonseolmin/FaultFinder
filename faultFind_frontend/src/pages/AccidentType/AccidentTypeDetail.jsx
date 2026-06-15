import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

import LeftSidebar from '../../components/Community/LeftSideBar.jsx';
import RightSidebar from '../../components/Community/RightSideBar.jsx';
import '../../components/Community/Community.css'; 
import './AccidentTypeDetail.css';

export default function AccidentTypeDetail() {
  const { typeId } = useParams(); // 주소창에서 카테고리 아이디를 뽑아옵니다.
  const navigate = useNavigate();

  // DB에서 가져온 실제 사고 리스트를 담을 바구니와 로딩 상태 정의
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  // 통역사 함수: 주소창의 영어(typeId)를 DB에 저장된 실제 카테고리 값으로 변환
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

  // 화면이 켜지거나 typeId가 변경될 때마다 실행되는 Hook
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const dbCategory = getDbCategoryName(typeId);
        
        // 슬래시(/)가 포함된 문자열을 안전하게 보내기 위해 주소를 쿼리 스트링(?category=) 구조로 변경합니다.
        const response = await axiosInstance.get(`/api/accidents/category?category=${encodeURIComponent(dbCategory)}`);
        // 받아온 데이터를 상태값에 저장합니다.
        setCases(response.data);
      } catch (error) {
        console.error("사고 상황 데이터를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [typeId]);

  // 카테고리 아이디를 한글 제목으로 변환해주는 함수
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

          {/* 안내 문구 영역 */}
          <div className="info-notice-box">
            <p><span className="highlight">본인과 가장 유사한 사고 상황</span>을 찾아보세요.</p>
            <p>제시된 판례와 기본 과실 비율을 참고할 수 있습니다.</p>
            <p>※ 실제 사고 정황에 따라 최종 비율은 달라질 수 있습니다.</p>
          </div>

          {/* 상황 리스트 출력 (로딩 처리 및 DB 데이터 바인딩) */}
          <div className="scenario-list">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#1a56db' }}>
                데이터를 불러오는 중입니다...
              </div>
            ) : cases.length > 0 ? (
              cases.map((scenario) => (
                <div key={scenario.caseCode} className="scenario-card">
                  <div className="scenario-info">
                    <h4>{scenario.title}</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>
                      당사자 유형 - A: {scenario.partyAName} / B: {scenario.partyBName}
                    </p>
                  </div>
                  <div className="scenario-ratio">
                    기본 {scenario.baseFaultA} : {scenario.baseFaultB}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                등록된 사고 상황 데이터가 존재하지 않습니다.
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

        <RightSidebar />
        
      </main>
    </div>
  );
}