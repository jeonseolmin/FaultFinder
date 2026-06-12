import React from "react";

function LeftSidebar() {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-title-box">
        <h2>커뮤니티</h2>
        <p>
          자유로운 의견 공유와
          <br />
          경험 나눔의 공간입니다.
        </p>
      </div>
      <div className="sidebar-menu">
        <button className="menu-item active">
          <span className="icon">:speech_balloon:</span> 자유게시판
        </button>
        <button className="menu-item">
          <span className="icon">:car:</span> 사고 후기
        </button>
        <button className="menu-item">
          <span className="icon">:grey_question:</span> Q&A
        </button>
        <button className="menu-item">
          <span className="icon">:loudspeaker:</span> 공지사항
        </button>
      </div>
      <div className="info-box">
        <h3>커뮤니티 이용 안내</h3>
        <ul>
          <li>타인을 비방하거나 명예를 훼손하는 글은 제재될 수 있습니다.</li>
          <li>광고, 홍보성 글은 사전 안내 없이 삭제될 수 있습니다.</li>
          <li>개인정보가 포함된 글은 작성에 유의해 주세요.</li>
        </ul>
        <button className="btn-policy">
          <span className="icon">:shield:</span> 커뮤니티 운영정책 보기
        </button>
      </div>
      <button className="btn-write">
        <span className="icon">:writing_hand:</span> 글쓰기
      </button>
    </aside>
  );
}
export default LeftSidebar;
