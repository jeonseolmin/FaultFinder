import React from 'react';
import { useNavigate } from 'react-router-dom';

// 🌟 사이드바 및 레이아웃 CSS 불러오기
import LeftSidebar from '../../components/Community/LeftSideBar.jsx';
import RightSidebar from '../../components/Community/RightSideBar.jsx';
import '../../components/Community/Community.css'; 
import './AccidentType.css';

// 🌟 분리해둔 데이터 불러오기
import { ACCIDENT_TYPES } from '../../data/accidentTypeData.js';

export default function AccidentType() {
  const navigate = useNavigate();

  return (
    <div className="community-page">
      <main className="main-container">
        
        {/* 왼쪽 사이드바 (사고유형 탭에 불이 들어오게 'type' 전달) */}
        <LeftSidebar activeTab="type" />

        {/* 가운데 메인 콘텐츠 */}
        <div className="accident-type-container">
          
          <section className="type-hero">
            <h1>사고유형 선택</h1>
            <p>해당하는 사고 유형을 선택해주세요.</p>
          </section>

          <section className="type-grid">
            {ACCIDENT_TYPES.map((type) => (
              <div 
                key={type.id} 
                className="type-card"
                // 카드를 누르면 해당 사고유형의 상세 페이지나 과실비율 페이지로 이동하게끔 뼈대 마련
                onClick={() => navigate(`/cases/${type.id}`)}
              >
                <div className="card-header">
                  <span className="card-number">{type.num}</span>
                  <h3>{type.title}</h3>
                </div>
                <p>{type.desc}</p>
                <div className="card-icon">{type.icon}</div>
                <span className="card-arrow">&gt;</span>
              </div>
            ))}
          </section>

          <section className="type-bottom-banner">
            <div className="banner-info">
              <span className="info-icon">i</span>
              <span>사고 유형을 정확히 선택하면 과실비율 조회 및 관련 법률 정보를 더 정확하게 확인할 수 있습니다.</span>
            </div>
            <button 
              className="btn-go-ratio"
              onClick={() => navigate('/faultsearch')}
            >
              과실비율 조회 바로가기 &gt;
            </button>
          </section>

        </div>
        
      </main>
    </div>
  );
}