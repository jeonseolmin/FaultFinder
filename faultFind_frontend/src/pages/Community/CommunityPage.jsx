import { useLocation } from 'react-router-dom';

import LeftSidebar from '../../components/SideBar/LeftSideBar.jsx';
import CommunityBoard from '../../components/Community/CommunityBoard.jsx';
import AccidentGuidePage from '../AccidentGuide/AccidentGuidePage.jsx';
import './CommunityPage.css';

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

<<<<<<< HEAD
    const renderMainContent = () => {
        if (location.pathname === '/guides') {
            return <AccidentGuidePage />;
        }
        return <CommunityBoard activeTab={activeTab} />;
    };

    return (
        <div className="community-page">
            <main className="main-container">
                <LeftSidebar activeTab={activeTab} />
                {renderMainContent()}
            </main>
        </div>
    );
=======
  // 🌟 핵심: 가운데 알맹이를 주소에 따라 다르게 리턴해주는 함수를 만듭니다.
  const renderMainContent = () => {
    if (location.pathname === '/guides') {
      return <AccidentGuidePage />; // 주소가 사고대처면 사고대처 화면을!
    }
    // 그 외(커뮤니티 등)는 기본적으로 게시판을 보여줍니다.
    return <CommunityBoard activeTab={activeTab} />;
  };

  return (
    <div className="community-page">
      <main className="main-container">
        <LeftSidebar activeTab={activeTab} />
        
        {/* 꽉 막혀있던 <BoardList /> 대신, 방금 만든 함수를 넣어줍니다! */}
        {renderMainContent()}
        
      </main>
    </div>
  );
>>>>>>> f70eb86f0bdae7be2dff2582807d870127e952a7
}