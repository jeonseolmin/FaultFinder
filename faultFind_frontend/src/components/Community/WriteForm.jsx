import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
import "./Write.css";

export default function WriteForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "free",
    title: "",
    content: "",
    isNotice: false,
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // 컴포넌트 렌더링 시 토큰을 해독하여 관리자 권한 확인
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("Authorization");
    
    if (token) {
      try {
        // JWT 토큰은 세 부분으로 나뉘며, 두 번째 부분(Payload)에 권한 정보가 있습니다.
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        const decodedData = JSON.parse(decodedJson);

        // 스프링 시큐리티 설정에 따라 키 값이 'auth' 또는 'role'일 수 있습니다.
        const userRole = decodedData.auth || decodedData.role; 
        
        if (userRole === "ROLE_ADMIN") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("토큰 해독 실패:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/community", formData);
      alert(response.data); 
      navigate("/community");
    } catch (error) {
      console.error("글 등록 실패:", error);
      alert("현재 활동 정지 상태이거나 서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="write-container">
      <div className="write-header">
        <h2>새 게시글 작성</h2>
      </div>

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
            <option value="review">사고후기</option>
            <option value="qna">Q&A</option>
          </select>
        </div>

        {/* 토큰 해독 결과 isAdmin이 true일 때만 렌더링 */}
        {isAdmin && (
          <div className="write-form-group" style={{ backgroundColor: '#f0f4f8', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: 0 }}>
              <input 
                type="checkbox" 
                name="isNotice" 
                className="write-notice-checkbox"
                checked={formData.isNotice} 
                onChange={handleChange} 
                style={{ width: '20px', height: '20px', marginRight: '10px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '1em', fontWeight: '700', color: '#1e3a8a' }}>
                📢 이 게시글을 공지사항으로 등록하기
              </span>
            </label>
          </div>
        )}

        <div className="write-form-group">
          <label>제목</label>
          <input
            type="text"
            className="write-input"
            name="title" 
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="write-form-group">
          <label>내용</label>
          <textarea
            className="write-textarea"
            name="content" 
            value={formData.content}
            onChange={handleChange}
            placeholder="자유롭게 의견과 경험을 나누어 주세요."
          ></textarea>
        </div>

        <div className="write-actions">
          <Link to="/community" className="btn-cancel">
            취소
          </Link>
          <button type="submit" className="btn-submit">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}