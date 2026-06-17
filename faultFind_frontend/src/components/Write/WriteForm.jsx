import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import './Write.css';

export default function WriteForm() {
  const navigate = useNavigate();

  // 1. 사용자가 입력한 데이터를 담을 그릇(상태) 만들기
  const [formData, setFormData] = useState({
    category: 'free',
    title: '',
    content: ''
  });

  // 2. 글씨를 칠 때마다 그릇에 데이터 업데이트하기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. 등록 버튼을 눌렀을 때 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지

    // 입력값 검사
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }

    try {
      const response = await  axiosInstance.post("/api/community",formData);
      
      alert(response.data); // "게시글이 성공적으로 등록되었습니다." 알림
      
      // 글쓰기 성공 시 커뮤니티 목록으로 강제 이동
      navigate('/community');
      
    } catch (error) {
      console.error('글 등록 실패:', error);
      alert('현재 활동 정지 상태이거나 서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="write-container">
      <div className="write-header">
        <h2>새 게시글 작성</h2>
      </div>
      
      {/* 🌟 폼 전송 이벤트 연결 */}
      <form onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label>카테고리</label>
          <select 
            className="write-select" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
          >
            <option value="free">자유게시판</option>
            <option value="review">사고 후기</option>
            <option value="qna">Q&A</option>
          </select>
        </div>
        
        <div className="write-form-group">
          <label>제목</label>
          <input 
            type="text" 
            className="write-input" 
            name="title" // name을 꼭 지정해야 합니다
            value={formData.title} 
            onChange={handleChange}
            placeholder="제목을 입력하세요" 
          />
        </div>
        
        <div className="write-form-group">
          <label>내용</label>
          <textarea 
            className="write-textarea" 
            name="content" // name 지정
            value={formData.content} 
            onChange={handleChange}
            placeholder="자유롭게 의견과 경험을 나누어 주세요."
          ></textarea>
        </div>
        
        <div className="write-actions">
          <a href="/community" className="btn-cancel" style={{ textDecoration: 'none' }}>취소</a>
          {/* 🌟 type을 submit으로 변경 */}
          <button type="submit" className="btn-submit">등록하기</button>
        </div>
      </form>
    </div>
  );
}