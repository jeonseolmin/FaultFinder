import React, { useState } from 'react'; 

import { createPortal } from 'react-dom'; 
import { Link } from "react-router-dom"; 
import { HiMiniChatBubbleLeftEllipsis } from "react-icons/hi2";
import { FaCarSide, FaShieldHalved, FaPencil } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";
import { PiSirenBold } from "react-icons/pi";

export default function LeftSidebar({ activeTab }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4가지 탭에 따른 맞춤형 정보 및 정책 데이터
  const getSidebarInfo = () => {
    switch (activeTab) {
      case "action":
        return {
          title: "사고대처",
          desc: "교통사고 발생 시\n단계별 대처 가이드입니다.",
          boxTitle: "사고대처 이용 안내",
          rules: [
            "사고 발생 시 가장 먼저 경찰과 보험사에 연락하세요.",
            "현장 보존 및 다각도 사진 촬영이 매우 중요합니다.",
            "인명 피해가 있다면 즉시 119에 신고하세요.",
          ],
          modalContent: `본 서비스는 교통사고 발생 시 유저의 신속한 초기 대응을 돕기 위해 표준 행동 요령 및 긴급 연락처 정보를 제공합니다.

1. 정보의 한계: 제공되는 대처 가이드는 일반적인 사례를 기반으로 공익적 목적으로 작성되었으며, 법적 책임을 보장하지 않습니다.
2. 긴급 신고 의무: 위급 상황 시, 즉시 112 및 119 구호 신고를 우선해야 합니다.`
        };
      case "type":
        return {
          title: "사고유형",
          desc: "다양한 교통사고\n유형별 판례와 분석입니다.",
          boxTitle: "사고유형 이용 안내",
          rules: [
            "본인과 가장 유사한 사고 상황을 찾아보세요.",
            "제시된 판례와 기본 과실 비율을 참고할 수 있습니다.",
            "실제 사고 정황에 따라 최종 비율은 달라질 수 있습니다.",
          ],
          modalContent: `본 서비스는 빈번하게 발생하는 주요 자동차 사고 유형 데이터와 분석 흐름을 축적하여 인사이트를 제공합니다.

1. 통계 데이터: 화면에 표기되는 분류는 커뮤니티 신고 건수 및 공공 판례에 기반한 통계치입니다.
2. 무단 복제 금지: 제공하는 사고 유형별 분석 로직은 무단 가공하여 배포할 수 없습니다.`
        };
      case "ratio":
        return {
          title: "과실비율 조회",
          desc: "AI 기반 예상 과실비율\n분석 서비스입니다.",
          boxTitle: "과실비율 조회 안내",
          rules: [
            "블랙박스 영상이나 사고 정황을 상세히 입력해주세요.",
            "AI가 분석한 예상 과실 비율을 알려드립니다.",
            "본 결과는 법적 효력이 없으며 참고용으로만 사용하세요.",
          ],
          modalContent: `본 서비스는 유저가 입력한 사고 상황을 자연어 처리 및 AI 벡터 검색 기술을 통해 분석하여 예상 과실비율을 매칭합니다.

1. 단순 참고용 고지: AI가 도출한 과실비율은 '예측치'이며 법적 효력을 가지지 않습니다.
2. 책임 제한: 본 서비스 결과를 근거로 발생한 분쟁에 대해 법적 책임을 지지 않습니다.`
        };
      case "community":
      default:
        return {
          title: "커뮤니티",
          desc: "자유로운 의견 공유와\n경험 나눔의 공간입니다.",
          boxTitle: "커뮤니티 이용 안내",
          rules: [
            "타인을 비방하거나 명예를 훼손하는 글은 제재될 수 있습니다.",
            "광고, 홍보성 글은 사전 안내 없이 삭제될 수 있습니다.",
            "개인정보가 포함된 글은 작성에 유의해 주세요.",
          ],
          modalContent: `안전하고 깨끗한 교통 정보 공유 문화를 위해 아래 커뮤니티 이용 수칙을 반드시 준수해 주시기 바랍니다.

1. 불량 게시물 제재: 비방, 허위 사실 유포 등은 관리자에 의해 '강제 삭제'될 수 있습니다.
2. 회원 활동 정지: 누적 신고 적발 시 '활동 정지' 또는 '강제 탈퇴' 조치가 취해집니다.`
        };
    }
  };

  const info = getSidebarInfo();

  // 모달창 렌더링 전용 컴포넌트 (Portal 사용)
  const PolicyModal = () => {
    if (!isModalOpen) return null;

    return createPortal(
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999999 }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '500px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.3em', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '15px' }}>
            🛡️ {info.title} 운영정책
          </h3>
          <div style={{ whiteSpace: 'pre-wrap', color: '#475569', fontSize: '0.95em', lineHeight: '1.6', maxHeight: '350px', overflowY: 'auto', marginBottom: '25px', paddingRight: '5px' }}>
            {info.modalContent}
          </div>
          <div style={{ textAlign: 'right' }}>
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={{ padding: '10px 24px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <aside className="left-sidebar">
      <div className="sidebar-title-box">
        <h2>{info.title}</h2>
        <p style={{ whiteSpace: "pre-wrap" }}>{info.desc}</p>
      </div>

      <div className="sidebar-menu">
        <Link to="/guides" className={`menu-item ${activeTab === "action" ? "active" : ""}`} style={{ textDecoration: "none" }}>
          <span className="icon"><PiSirenBold color="#f32222" size={20}/></span> 사고대처
        </Link>
        <Link to="/cases" className={`menu-item ${activeTab === "type" ? "active" : ""}`} style={{ textDecoration: "none" }}>
          <span className="icon"><FaCarSide color="#f7984b" size={20} /></span> 사고유형
        </Link>
        <Link to="/fault-ratios" className={`menu-item ${activeTab === "ratio" ? "active" : ""}`} style={{ textDecoration: "none" }}>
          <span className="icon"><FaBalanceScale color="#4437ff" size={20} /></span> 과실비율 조회
        </Link>
        <Link to="/community" className={`menu-item ${activeTab === "community" ? "active" : ""}`} style={{ textDecoration: "none" }}>
          <span className="icon"><HiMiniChatBubbleLeftEllipsis size={20} style={{ filter: "invert(1)" }} /></span> 커뮤니티
        </Link>
      </div>

      <div className="info-box">
        <h3>{info.boxTitle}</h3>
        <ul>
          {info.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
        <button className="btn-policy" onClick={() => setIsModalOpen(true)}>
          <span className="icon"><FaShieldHalved size={15} /></span> {info.title} 운영정책
        </button>
      </div>

      <Link to="/community/write" className="btn-write" style={{ textDecoration: "none", display: "flex", justifyContent: "center" }}>
        <span><FaPencil color="#cebe81" /></span> 글쓰기
      </Link>

      <PolicyModal />
    </aside>
  );
}