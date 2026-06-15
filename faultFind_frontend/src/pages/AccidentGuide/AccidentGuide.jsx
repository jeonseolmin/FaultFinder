import React from 'react';

// 🌟 사이드바 및 CSS 불러오기
import LeftSidebar from '../../components/Community/LeftSideBar.jsx';
import '../../components/Community/Community.css'; 
import "./AccidentGuide.css";

// 🌟 react-icons 불러오기
import { RiPoliceCarFill } from "react-icons/ri";
import { FaPhoneAlt, FaCamera, FaAmbulance, FaBuilding, FaCarCrash, FaIdCard, FaEye, FaClipboardList, FaVideo, FaBalanceScale, FaHospital, FaGavel, FaCar } from "react-icons/fa";
import { MdOutlineSecurity, MdLocalPolice } from "react-icons/md";

export default function AccidentGuide() {
  
  
  const ACTION_STEPS = [
    { icon: <RiPoliceCarFill color="#f59e0b" />, title: "부상자 확인", desc: "부상자가 있는지 확인하고 안전한 곳으로 이동" },
    { icon: <FaAmbulance color="#ef4444" />, title: "119 신고", desc: "부상자 발생 시 즉시 119에 신고" },
    { icon: <MdLocalPolice color="#3b82f6" />, title: "경찰 신고", desc: "사고 사실을 경찰에 신고 (112)" },
    { icon: <FaCamera color="#8b5cf6" />, title: "현장 사진 촬영", desc: "사고 현장, 차량, 파손 부위 등을 촬영" },
    { icon: <MdOutlineSecurity color="#0062ff" />, title: "보험사 접수", desc: "보험사에 사고 접수 및 보상 상담" },
  ];

  const EMERGENCY_CONTACTS = [
    { icon: <MdLocalPolice color="#3b82f6" />, title: "경찰", desc: "사고 신고 및 출동", number: "112" }, // 파란색
    { icon: <FaAmbulance color="#ef4444" />, title: "긴급구조 (119)", desc: "부상자 발생 시 신고", number: "119" },
    { icon: <FaCarCrash color="#64748b" />, title: "도로교통공단", desc: "교통사고 상담", number: "1577-0990" },
    { icon: <FaBuilding color="#64748b" />, title: "손해보험협회", desc: "자동차 보험 상담", number: "02-3702-8631" },
    { icon: <FaCarCrash color="#f97316" />, title: "견인 서비스", desc: "사고 차량 견인 요청", number: "1588-2504" },
  ];

  const CHECKLIST_ITEMS = [
    { icon: <MdOutlineSecurity color="#10b981" />, title: "1. 부상자 확인 및 안전 확보", desc: "부상 여부 확인 후 안전한 장소로 이동" },
    { icon: <FaPhoneAlt color="#ef4444" />, title: "2. 119 및 경찰 신고", desc: "필요 시 119 신고 후 경찰(112)에 신고" },
    { icon: <FaCar color="#4900d1" />, title: "3. 현장 보존", desc: "사고 현장을 보존하고 차량 이동 최소화" },
    { icon: <FaCamera color="#000000" />, title: "4. 증거 사진 촬영", desc: "사고 현장, 차량 파손 부위, 도로 상황 등 촬영" },
    { icon: <FaIdCard color="#0a444e" />, title: "5. 상대방 정보 확인", desc: "이름, 연락처, 보험사, 차량번호 확인" },
    { icon: <FaEye color="#000000" />, title: "6. 목격자 확보", desc: "목격자가 있다면 연락처 확보" },
    { icon: <FaClipboardList color="#929292" />, title: "7. 보험사 접수", desc: "보험사에 사고 접수 및 보상 상담 진행" },
  ];

  const BOTTOM_BANNER_ITEMS = [
    { icon: <FaVideo color="#14b8a6" />, title: "블랙박스 확인", desc: "블랙박스 영상은 사고 해결에 중요한 증거가 됩니다." },
    { icon: <FaBalanceScale color="#8b5cf6" />, title: "과실비율 확인", desc: "사고 유형에 따라 과실비율이 달라집니다." },
    { icon: <FaHospital color="#ef4444" />, title: "병원 진료", desc: "경미한 사고라도 병원 진료를 받는 것이 안전합니다." },
    { icon: <FaGavel color="#d97706" />, title: "법률 상담", desc: "분쟁 발생 시 전문가의 법률 상담을 받으세요." },
  ];

  return (
    <div className="community-page">
      <main className="main-container">
        
        <LeftSidebar activeTab="action" />

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
                <FaPhoneAlt style={{marginRight: '8px'}} /> 
                모든 신고는 신속하고 정확하게!<br/>
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
              <span style={{fontSize: '24px'}}><MdOutlineSecurity /></span><br/>
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