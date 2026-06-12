import React from 'react';
import './AccidentGuide.css';

export default function AccidentGuide() {
  // 행동요령 데이터
  const actionSteps = [
    { num: 1, icon: "👤", title: "부상자 확인", desc: "부상자가 있는지 확인하고 안전한 곳으로 이동" },
    { num: 2, icon: "🚨", title: "119 신고", desc: "부상자 발생 시 즉시 119에 신고" },
    { num: 3, icon: "👮", title: "경찰 신고", desc: "사고 사실을 경찰에 신고 (112)" },
    { num: 4, icon: "📸", title: "현장 사진 촬영", desc: "사고 현장, 차량, 파손 부위 등을 촬영" },
    { num: 5, icon: "📝", title: "보험사 접수", desc: "보험사에 사고 접수 및 보상 상담" },
  ];

  // 긴급 연락망 데이터
  const contacts = [
    { icon: "🚓", title: "경찰", desc: "사고 신고 및 출동", number: "112" },
    { icon: "🚑", title: "긴급구조 (119)", desc: "부상자 발생 시 신고", number: "119" },
    { icon: "🏢", title: "도로교통공단", desc: "교통사고 상담", number: "1577-0990" },
    { icon: "🚙", title: "견인 서비스", desc: "사고 차량 견인 요청", number: "1588-2504" },
  ];

  // 체크리스트 데이터
  const checklist = [
    { icon: "🛡️", title: "1. 부상자 확인 및 안전 확보", desc: "부상 여부 확인 후 안전한 장소로 이동" },
    { icon: "📞", title: "2. 119 및 경찰 신고", desc: "필요 시 119 신고 후 경찰(112)에 신고" },
    { icon: "🚗", title: "3. 현장 보존", desc: "사고 현장을 보존하고 차량 이동 최소화" },
    { icon: "📷", title: "4. 증거 사진 촬영", desc: "사고 현장, 차량 파손 부위, 도로 상황 등 촬영" },
    { icon: "👥", title: "5. 상대방 정보 확인", desc: "이름, 연락처, 보험사, 차량번호 확인" },
    { icon: "👀", title: "6. 목격자 확보", desc: "목격자가 있다면 연락처 확보" },
    { icon: "📋", title: "7. 보험사 접수", desc: "보험사에 사고 접수 및 보상 상담 진행" },
  ];

  return (
    <div className="accident-guide-container">
      {/* 1. 상단 타이틀 영역 */}
      <section className="guide-hero">
        <h1>사고대처</h1>
        <p>사고 발생 시 당황하지 말고 아래 절차에 따라 대응하세요.</p>
      </section>

      {/* 2. 메인 3단 그리드 영역 */}
      <section className="guide-main-grid">
        
        {/* 왼쪽: 행동요령 */}
        <div className="guide-card">
          <h3>사고 발생 시 행동요령</h3>
          <div className="step-list">
            {actionSteps.map((step) => (
              <div key={step.num} className="step-item">
                <div className="step-number">{step.num}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-text">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 중앙: 긴급 연락망 */}
        <div className="guide-card">
          <h3>긴급 연락망</h3>
          <div className="contact-list">
            {contacts.map((contact, idx) => (
              <div key={idx} className="contact-item">
                <div className="step-icon">{contact.icon}</div>
                <div className="contact-info">
                  <h4>{contact.title}</h4>
                  <p>{contact.desc}</p>
                </div>
                <div className="contact-number">{contact.number}</div>
              </div>
            ))}
          </div>
          <div className="emergency-banner">
            📞 모든 신고는 신속하고 정확하게!<br/>
            위급 상황 시 112 또는 119로 즉시 연락하세요.
          </div>
        </div>

        {/* 오른쪽: 체크리스트 */}
        <div className="guide-card">
          <h3>사고 체크리스트</h3>
          <div className="checklist">
            {checklist.map((item, idx) => (
              <div key={idx} className="check-item">
                <div className="check-icon">{item.icon}</div>
                <div className="check-text">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 하단 배너 영역 */}
      <section className="guide-bottom-banner">
        <div className="banner-title">
          <span style={{fontSize: '24px'}}>📣</span><br/>
          추가 안내
        </div>
        <div className="banner-items">
          <div className="b-item">
            <span style={{fontSize: '30px'}}>📼</span>
            <div>
              <h4>블랙박스 확인</h4>
              <p>블랙박스 영상은 사고 해결에<br/>중요한 증거가 됩니다.</p>
            </div>
          </div>
          <div className="b-item">
            <span style={{fontSize: '30px'}}>⚖️</span>
            <div>
              <h4>과실비율 확인</h4>
              <p>사고 유형에 따라<br/>과실비율이 달라집니다.</p>
            </div>
          </div>
          <div className="b-item">
            <span style={{fontSize: '30px'}}>🏥</span>
            <div>
              <h4>병원 진료</h4>
              <p>경미한 사고라도 병원 진료를<br/>받는 것이 안전합니다.</p>
            </div>
          </div>
          <div className="b-item">
            <span style={{fontSize: '30px'}}>👨‍⚖️</span>
            <div>
              <h4>법률 상담</h4>
              <p>분쟁 발생 시 전문가의<br/>법률 상담을 받으세요.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}