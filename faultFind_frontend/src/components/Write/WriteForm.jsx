import React from 'react';
import './Write.css';

export default function WriteForm() {
  return (
    <div className="write-container">
      <div className="write-header">
        <h2>새 게시글 작성</h2>
      </div>
      
      <form>
        <div className="write-form-group">
          <label>카테고리</label>
          <select className="write-select">
            <option value="free">자유게시판</option>
            <option value="review">사고 후기</option>
            <option value="qna">Q&A</option>
          </select>
        </div>
        
        <div className="write-form-group">
          <label>제목</label>
          <input type="text" className="write-input" placeholder="제목을 입력하세요" />
        </div>
        
        <div className="write-form-group">
          <label>내용</label>
          <textarea className="write-textarea" placeholder="자유롭게 의견과 경험을 나누어 주세요."></textarea>
        </div>
        
        <div className="write-actions">
          {/* 취소 시 다시 커뮤니티로 돌아가도록 a 태그 사용 */}
          <a href="/community" className="btn-cancel" style={{ textDecoration: 'none' }}>취소</a>
          {/* 나중에 Spring Boot로 데이터를 보낼 전송 버튼 */}
          <button type="button" className="btn-submit">등록하기</button>
        </div>
      </form>
    </div>
  );
}