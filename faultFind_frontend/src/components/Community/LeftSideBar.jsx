import React from 'react';

// 🌟 이제 setActiveTab은 받지 않습니다. activeTab만 받습니다!
export default function LeftSidebar({ activeTab }) {
  
  const getSidebarInfo = () => {
    switch(activeTab) {
      case 'action': 
        return {
          title: '사고대처', desc: '교통사고 발생 시\n단계별 대처 가이드입니다.',
          boxTitle: '사고대처 이용 안내',
          rules: ['사고 발생 시 가장 먼저 경찰과 보험사에 연락하세요.', '현장 보존 및 다각도 사진 촬영이 매우 중요합니다.', '인명 피해가 있다면 즉시 119에 신고하세요.']
        };
      case 'type': 
        return {
          title: '사고유형', desc: '다양한 교통사고\n유형별 판례와 분석입니다.',
          boxTitle: '사고유형 이용 안내',
          rules: ['본인과 가장 유사한 사고 상황을 찾아보세요.', '제시된 판례와 기본 과실 비율을 참고할 수 있습니다.', '실제 사고 정황에 따라 최종 비율은 달라질 수 있습니다.']
        };
      case 'ratio': 
        return {
          title: '과실비율 조회', desc: 'AI 기반 예상 과실비율\n분석 서비스입니다.',
          boxTitle: '과실비율 조회 안내',
          rules: ['블랙박스 영상이나 사고 정황을 상세히 입력해주세요.', 'AI가 분석한 예상 과실 비율을 알려드립니다.', '본 결과는 법적 효력이 없으며 참고용으로만 사용하세요.']
        };
      case 'community': 
      default:
        return {
          title: '커뮤니티', desc: '자유로운 의견 공유와\n경험 나눔의 공간입니다.',
          boxTitle: '커뮤니티 이용 안내',
          rules: ['타인을 비방하거나 명예를 훼손하는 글은 제재될 수 있습니다.', '광고, 홍보성 글은 사전 안내 없이 삭제될 수 있습니다.', '개인정보가 포함된 글은 작성에 유의해 주세요.']
        };
    }
  };

  const info = getSidebarInfo();

  return (
    <aside className="left-sidebar">
      <div className="sidebar-title-box">
        <h2>{info.title}</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{info.desc}</p>
      </div>
      
      {/* 🌟 onClick을 전부 지우고 a 태그의 href로 깔끔하게 교체했습니다 */}
      <div className="sidebar-menu">
        <a 
          href="/accidentguide" 
          className={`menu-item ${activeTab === 'action' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className="icon">🚨</span> 사고대처
        </a>
        <a 
          href="/accidentcase" 
          className={`menu-item ${activeTab === 'type' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className="icon">🚗</span> 사고유형
        </a>
        <a 
          href="/faultsearch" 
          className={`menu-item ${activeTab === 'ratio' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className="icon">⚖️</span> 과실비율 조회
        </a>
        <a 
          href="/community" 
          className={`menu-item ${activeTab === 'community' ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className="icon">💬</span> 커뮤니티
        </a>
      </div>
      
      <div className="info-box">
        <h3>{info.boxTitle}</h3>
        <ul>
          {info.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
        <button className="btn-policy"><span className="icon">🛡️</span> {info.title} 운영정책 보기 &gt;</button>
      </div>
      
      <a 
        href="/write" 
        className="btn-write" 
        style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
      >
        <span className="icon">✍️</span> 글쓰기
      </a>
    </aside>
  );
}