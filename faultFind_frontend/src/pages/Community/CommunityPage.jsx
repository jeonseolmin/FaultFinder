import React from 'react';
import { useLocation } from 'react-router-dom'; 

import LeftSidebar from '../../components/Community/LeftSideBar.jsx';
import BoardList from '../../components/Community/BoardList.jsx';
import RightSidebar from '../../components/Community/RightSideBar.jsx';
// 🌟 우리가 만든 사고대처 컴포넌트를 불러옵니다! (경로는 실제 파일 위치에 맞게 맞춰주세요)
import AccidentGuide from '../AccidentGuide/AccidentGuide.jsx'; 
import '../../components/Community/Community.css'; 

export default function CommunityPage() {
  const location = useLocation(); 

  const getActiveTab = () => {
    switch (location.pathname) {
      case '/guides': return 'action';
      case '/cases': return 'type';
      case '/fault-ratios': return 'ratio';
      case '/community':
      default:
        return 'community';
    }
  };

  const activeTab = getActiveTab();

  // 🌟 핵심: 가운데 알맹이를 주소에 따라 다르게 리턴해주는 함수를 만듭니다.
  const renderMainContent = () => {
    if (location.pathname === '/guides') {
      return <AccidentGuide />; // 주소가 사고대처면 사고대처 화면을!
    }
    // 그 외(커뮤니티 등)는 기본적으로 게시판을 보여줍니다.
    return <BoardList activeTab={activeTab} />; 
  };

  return (
    <div className="community-page">
      <main className="main-container">
        <LeftSidebar activeTab={activeTab} />
        
        {/* 🌟 꽉 막혀있던 <BoardList /> 대신, 방금 만든 함수를 넣어줍니다! */}
        {renderMainContent()}
        
        <RightSidebar />
      </main>
    </div>
  );
}