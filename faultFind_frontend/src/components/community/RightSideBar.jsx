import React from 'react';

export default function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <div className="widget">
        <h3>인기 게시글</h3>
        <div style={{ backgroundColor: '#f3f4f6', border: '2px dashed #d1d5db', padding: '20px', textAlign: 'center', color: '#9ca3af' }}>
          인기글 리스트 데이터
        </div>
      </div>

      <div className="widget">
        <h3>최근 댓글</h3>
        <div style={{ backgroundColor: '#f3f4f6', border: '2px dashed #d1d5db', padding: '20px', textAlign: 'center', color: '#9ca3af' }}>
          최근 댓글 데이터
        </div>
      </div>

      <div className="chatbot-banner">
        <div className="bot-icon">🤖</div>
        <p>궁금한 내용은 AI 챗봇에게 물어보세요!</p>
        <button className="btn-chatbot">AI 챗봇 상담하기</button>
      </div>
    </aside>
  );
}