import React from 'react';

// ../../ 를 사용해 두 칸(Community 폴더 -> pages 폴더 -> src 폴더) 밖으로 나간 뒤 components를 찾습니다.
import LeftSidebar from '../../components/Community/LeftSideBar';
import BoardList from '../../components/Community/BoardList';
import RightSidebar from '../../components/Community/RightSideBar';
import '../../components/Community/Community.css'; 

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