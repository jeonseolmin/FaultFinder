import { useLocation } from 'react-router-dom'; 

import LeftSidebar from '../SideBar/LeftSideBar.jsx';
import CommunityBoard from '../SideBar/CommunityBoard.jsx';
import AccidentGuidePage from '../../pages/AccidentGuide/AccidentGuidePage.jsx';
import './Community.css';

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
}