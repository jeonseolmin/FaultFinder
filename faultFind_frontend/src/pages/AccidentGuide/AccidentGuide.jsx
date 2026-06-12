import React from 'react';
// 🌟 점 두 개(../)를 한 번 더 찍어서 components 폴더로 정확히 찾아가게 수정합니다!
import LeftSidebar from '../../components/Community/LeftSideBar.jsx';
import RightSidebar from '../../components/Community/RightSideBar.jsx';
import '../../components/Community/Community.css'; 
import "../../components/AccidentGuide/AccidentGuide.css";

import { 
  ACTION_STEPS, 
  EMERGENCY_CONTACTS, 
  CHECKLIST_ITEMS, 
  BOTTOM_BANNER_ITEMS 
} from '../../data/AccidentData.js';

export default function AccidentGuide() {
  return (
    // 🌟 커뮤니티와 똑같은 뼈대(community-page, main-container)로 전체를 감쌉니다.
    <div className="community-page">
      <main className="main-container">
        
        {/* 1. 왼쪽 사이드바 (사고대처 메뉴에 불이 들어오도록 activeTab 값을 직접 줍니다) */}
        <LeftSidebar activeTab="action" />

        {/* 2. 가운데 진짜 내용 (사고대처 3단 그리드) */}
        <div className="accident-guide-container">
          <section className="guide-hero">
            <h1>사고대처</h1>
            <p>사고 발생 시 당황하지 말고 아래 절차에 따라 대응하세요.</p>
          </section>

          <section className="guide-main-grid">
            <div className="guide-card">
              <h3>사고 발생 시 행동요령</h3>
              <div className="step-list">
                {ACTION_STEPS.map((step) => (
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

            <div className="guide-card">
              <h3>긴급 연락망</h3>
              <div className="contact-list">
                {EMERGENCY_CONTACTS.map((contact, idx) => (
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

            <div className="guide-card">
              <h3>사고 체크리스트</h3>
              <div className="checklist">
                {CHECKLIST_ITEMS.map((item, idx) => (
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

          <section className="guide-bottom-banner">
            <div className="banner-title">
              <span style={{fontSize: '24px'}}>📣</span><br/>
              추가 안내
            </div>
            <div className="banner-items">
              {BOTTOM_BANNER_ITEMS.map((item, idx) => (
                <div key={idx} className="b-item">
                  <span style={{fontSize: '30px'}}>{item.icon}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        
      </main>
    </div>
  );
}