import React from 'react';

export default function BoardList() {
  return (
    <section className="board-content">
      <div className="board-header">
        <h2>자유게시판</h2>
        <p>교통사고와 관련된 다양한 의견을 공유해주세요.</p>
      </div>

      {/* 나중에 DB 데이터를 불러올 임시 공간 (인라인 스타일로 박스만 표시) */}
      <div style={{ backgroundColor: '#f3f4f6', border: '2px dashed #d1d5db', borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#9ca3af', marginTop: '20px' }}>
        여기에 게시글 목록 데이터가 들어옵니다.
      </div>
    </section>
  );
}