import React from 'react';
// ../ 를 사용해 상위 폴더로 나간 뒤 components 폴더로 들어갑니다.
import LeftSidebar from '../components/community/LeftSidebar';
import BoardList from '../components/community/BoardList';
import RightSidebar from '../components/community/RightSidebar';
import '../components/community/Community.css'; 

export default function CommunityPage() {
  return (
    <div className="community-page">
      <main className="main-container">
        <LeftSidebar />
        <BoardList />
        <RightSidebar />
      </main>
    </div>
  );
}