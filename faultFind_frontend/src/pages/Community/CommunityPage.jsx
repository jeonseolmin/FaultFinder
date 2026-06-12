import React from 'react';

// ../../ 를 사용해 두 칸(Community 폴더 -> pages 폴더 -> src 폴더) 밖으로 나간 뒤 components를 찾습니다.
import LeftSidebar from '../../components/community/LeftSidebar';
import BoardList from '../../components/community/BoardList';
import RightSidebar from '../../components/community/RightSidebar';
import '../../components/community/Community.css'; 

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

export default CommunityPage;
