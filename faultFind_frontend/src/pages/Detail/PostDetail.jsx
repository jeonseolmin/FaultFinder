import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/Write/Write.css'; // 디자인은 기존 글쓰기 폼을 재활용합니다

export default function PostDetail() {
  const { id } = useParams(); // 주소창에 있는 글 번호(id)를 가져옵니다
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  // 화면이 켜질 때 백엔드에서 글 내용 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 🌟 백엔드 주소 규칙에 맞춰 /faultfinder/ 로 수정
        const response = await axios.get(`http://localhost:8080/faultfinder/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("글을 불러오지 못했습니다.", error);
        alert("글을 불러오는데 실패했습니다.");
      }
    };
    fetchPost();
  }, [id]);

  // 🌟 글 삭제 버튼을 눌렀을 때 실행될 함수
  const handleDelete = async () => {
    if (!window.confirm("정말 이 글을 삭제하시겠습니까?")) return;

    try {
      const token = localStorage.getItem('token');
      // 🌟 삭제 요청 주소도 /faultfinder/ 로 수정
      await axios.delete(`http://localhost:8080/faultfinder/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("글이 삭제되었습니다.");
      navigate('/community'); // 삭제 후 목록으로 이동
      
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

  // 데이터를 불러오는 중일 때 보여줄 화면
  if (!post) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

  return (
    <div className="write-container">
      <div className="write-header">
        <h2>{post.title}</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', marginTop: '10px' }}>
          <span>작성자: {post.author}</span>
          <span>작성일: {post.createdAt ? post.createdAt.split('T')[0] : ''}</span>
        </div>
      </div>
      
      {/* 글 내용 출력 영역 */}
      <div className="write-form-group" style={{ minHeight: '300px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '20px', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </div>
      
      <div className="write-actions" style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/community')} className="btn-cancel">목록으로</button>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* 🌟 수정 버튼 클릭 시 수정 페이지(/community/edit/글번호)로 이동하게 추가! */}
          <button 
            onClick={() => navigate(`/community/edit/${id}`)} 
            className="btn-submit" 
            style={{ backgroundColor: '#28a745' }}
          >
            수정
          </button>
          <button 
            onClick={handleDelete} 
            className="btn-submit" 
            style={{ backgroundColor: '#dc3545' }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}