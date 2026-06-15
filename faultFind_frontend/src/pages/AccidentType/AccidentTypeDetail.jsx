import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import LeftSidebar from '../../components/Community/LeftSideBar.jsx';
import RightSidebar from '../../components/Community/RightSideBar.jsx';
import '../../components/Community/Community.css'; 
import './AccidentTypeDetail.css';

export default function AccidentTypeDetail() {
  const { typeId } = useParams(); // 주소창에서 카테고리 아이디(예: car-to-car)를 뽑아옵니다.
  const navigate = useNavigate();

  // (임시) 화면에 보여주기 위한 가짜 데이터입니다.
  // 나중에 DB가 연결되면 typeId를 서버로 보내서 그에 맞는 상황 리스트를 받아오게 됩니다.
  const dummyScenarios = [
    { id: 1, title: "차선 변경 중 측면 접촉", desc: "직진하는 차량과 차선을 변경하는 차량 간의 사고", ratio: "70 : 30" },
    { id: 2, title: "신호 대기 중 정차 차량 추돌", desc: "정지해 있는 앞차를 뒤차가 들이받은 사고", ratio: "100 : 0" },
    { id: 3, title: "교차로 직진 대 좌회전", desc: "신호등 없는 교차로에서 발생한 충돌 사고", ratio: "80 : 20" },
  ];

  // 카테고리 아이디를 한글 제목으로 변환해주는 간단한 함수
  const getTitle = () => {
    if (typeId === 'car-to-car') return '차량 대 차량 사고';
    if (typeId === 'car-to-pedestrian') return '차량 대 보행자 사고';
    // ... 나머지 매핑
    return '사고유형 상세';
  };

  return (
    <div className="community-page">
      <main className="main-container">
        
        <LeftSidebar activeTab="type" />

        <div className="type-detail-container">
          <div className="detail-header">
            <h2>{getTitle()}</h2>
          </div>

          {/* 🌟 요청하신 안내 문구 영역 */}
          <div className="info-notice-box">
            <p><span className="highlight">본인과 가장 유사한 사고 상황</span>을 찾아보세요.</p>
            <p>제시된 판례와 기본 과실 비율을 참고할 수 있습니다.</p>
            <p>※ 실제 사고 정황에 따라 최종 비율은 달라질 수 있습니다.</p>
          </div>

          {/* 상황 리스트 출력 */}
          <div className="scenario-list">
            {dummyScenarios.map((scenario) => (
              <div key={scenario.id} className="scenario-card">
                <div className="scenario-info">
                  <h4>{scenario.title}</h4>
                  <p>{scenario.desc}</p>
                </div>
                <div className="scenario-ratio">
                  기본 {scenario.ratio}
                </div>
              </div>
            ))}
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