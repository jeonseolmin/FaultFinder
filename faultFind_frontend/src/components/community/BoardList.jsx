import React from 'react';

// 👈 부모로부터 activeTab(현재 탭)을 받아옵니다.
export default function BoardList({ activeTab }) {
  
  // 현재 탭에 맞춰서 제목과 설명을 반환해주는 함수
  const getBoardInfo = () => {
    switch(activeTab) {
      case 'free': return { title: '자유게시판', desc: '교통사고와 관련된 다양한 의견을 공유해주세요.' };
      case 'review': return { title: '사고 후기', desc: '생생한 교통사고 대처 경험담을 나누어주세요.' };
      case 'qna': return { title: 'Q&A', desc: '사고 처리 과정에서 궁금한 점을 질문해보세요.' };
      case 'notice': return { title: '공지사항', desc: '커뮤니티의 중요 안내사항을 확인하세요.' };
      default: return { title: '자유게시판', desc: '교통사고와 관련된 다양한 의견을 공유해주세요.' };
    }
  };

  const info = getBoardInfo();

  return (
    <section className="board-content">
      <div className="board-header">
        {/* 선택된 탭에 따라 제목과 설명이 바뀝니다! */}
        <h2>{info.title}</h2>
        <p>{info.desc}</p>
      </div>

      <div style={{ backgroundColor: '#f3f4f6', border: '2px dashed #d1d5db', borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#9ca3af', marginTop: '20px' }}>
        현재 보고 계신 게시판은 <strong>{info.title}</strong> 입니다.<br/><br/>
        나중에 Spring Boot에서 데이터를 가져올 때, <br/>
        선택된 탭 정보(`{activeTab}`)를 사용해 서로 다른 게시글 목록을 불러오게 됩니다.
      </div>
    </section>
  );
}