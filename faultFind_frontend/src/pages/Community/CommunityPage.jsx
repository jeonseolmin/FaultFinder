import React from 'react';
import { useLocation } from 'react-router-dom'; // 🌟 주소를 읽기 위해 반드시 필요합니다!

import LeftSidebar from '../../components/Community/LeftSideBar.jsx';
import BoardList from '../../components/Community/BoardList.jsx';
import RightSidebar from '../../components/Community/RightSidebar.jsx';
import '../../components/Community/Community.css'; 

export default function CommunityPage() {
  const location = useLocation(); // 현재 주소창의 URL을 가져옵니다.

  // 주소에 따라 사이드바에게 줄 키워드를 결정합니다.
  const getActiveTab = () => {
    switch (location.pathname) {
      case '/accidentguide': return 'action';
      case '/accidentcase': return 'type';
      case '/faultsearch': return 'ratio';
      case '/community':
      default:
        return 'community';
    }
  };

  const activeTab = getActiveTab();

  return (
    <div className="community-page">
      <main className="main-container">
        {/* 계산된 activeTab을 자식들에게 내려줍니다 */}
        <LeftSidebar activeTab={activeTab} />
        <BoardList activeTab={activeTab} />
        <RightSidebar />
      </main>
    </div>
  );
}