import React from "react";

// ../../ 를 사용해 두 칸(Community 폴더 -> pages 폴더 -> src 폴더) 밖으로 나간 뒤 components를 찾습니다.
import LeftSidebar from "../../components/Community/LeftSidebar";
import RightSidebar from "../../components/Community/RightSidebar";
import "../../components/Community/Community.css";

function CommunityPage() {
  return (
    <div className="community-page">
      <main className="main-container">
        <LeftSidebar />
        <RightSidebar />
      </main>
    </div>
  );
}

export default CommunityPage;
