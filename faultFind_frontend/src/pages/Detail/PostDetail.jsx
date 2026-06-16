import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import './PostDetail.css';

export default function PostDetail() {
  const { id } = useParams(); // 주소창에서 게시글 ID 추출
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 전환 상태
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const getLoginUser = () => {
    // 1. 유저님이 발견하신 "accessToken"을 최우선으로 가져옵니다!
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("Authorization");
    
    if (token) {
      try {
        // JWT 토큰의 가운데 부분(페이로드)을 디코딩합니다.
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        // 🛠️ [중요] 콘솔창(F12)에 토큰 내부에 진짜 뭐가 들었는지 강제로 출력합니다.
        console.log("정밀 분석 - 내 토큰 내용물(페이로드):", payload);
        
        // 백엔드 스프링 시큐리티가 토큰에 저장한 값들 중 하나를 꺼냅니다.
        // post.author(작성자)와 비교해야 하므로 문자열이 일치하는 필드를 찾아야 합니다.
        return payload.sub || payload.username || payload.email || payload.id;
      } catch (e) {
        console.error("JWT 토큰 디코딩 실패:", e);
      }
    }
    
    // 혹시 토큰이 아니라 일반 문자열로 저장되어 있을 때를 위한 방어 코드
    return localStorage.getItem("email") || localStorage.getItem("username");
  };

  // 최종 유저 정보 변수 담기
  const currentUsername = getLoginUser();

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/community/${id}`);
        setPost(response.data);
        setEditTitle(response.data.title);
        setEditContent(response.data.content);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다.", error);
        alert("존재하지 않거나 삭제된 게시글입니다.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [id]);

  // 게시글 좋아요 함수
  const handleLike = async () => {
    try {
      await axiosInstance.post(`/api/community/${id}/like`);
      // 좋아요 성공 시 화면의 숫자도 즉시 +1 해줍니다 (새로고침 없이 부드럽게!)
      setPost({ ...post, likeCount: post.likeCount + 1 });
    } catch (error) {
      console.error("좋아요 실패", error);
      alert("로그인이 필요하거나 오류가 발생했습니다.");
    }
  };

  // 게시글 삭제 함수
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(`/api/community/${id}`);
      alert("게시글이 삭제되었습니다.");
      navigate('/community'); // 삭제 후 목록으로 이동
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

  // 게시글 수정 저장 함수
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/api/community/${id}`, {
        title: editTitle,
        content: editContent,
        category: post.category
      });
      alert("게시글이 수정되었습니다.");
      setPost({ ...post, title: editTitle, content: editContent });
      setIsEditMode(false);
    } catch (error) {
      console.error("수정 실패", error);
      alert("수정 권한이 없거나 오류가 발생했습니다.");
    }
  };

  if (loading) return <div className="loading-box">로딩 중...</div>;
  if (!post) return null;

  // 현재 로그인한 사람과 글쓴이가 같은지 판단하는 스위치
  const isAuthor = post.author === currentUsername;

  return (
    <div className="post-detail-container">
      {/* 수정 모드가 아닐 때 (일반 상세 보기) */}
      {!isEditMode ? (
        <>
          <div className="detail-header">
            <h2>{post.title}</h2>
            <div className="post-meta">
              <span>작성자: {post.author}</span> | <span>{post.createdDate}</span> 
              {/* 조회수 표시 */}
              <span style={{ marginLeft: '10px' }}>조회수 {post.viewCount || 0}</span>
            </div>
          </div>
          <div className="detail-content">
            <p>{post.content}</p>
          </div>

          <div className="detail-actions">
            <button onClick={() => navigate(-1)} className="btn-back">목록으로</button>
            
            {/* 좋아요 버튼 */}
            <button 
              onClick={handleLike} 
              style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
            >
              👍 좋아요 {post.likeCount || 0}
            </button>
            
            {/* 글쓴이 본인일 때만 수정/삭제 버튼을 렌더링합니다 */}
            {isAuthor && (
              <div className="author-buttons">
                <button onClick={() => setIsEditMode(true)} className="btn-edit">수정</button>
                <button onClick={handleDelete} className="btn-delete">삭제</button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* 수정 모드일 때 (폼 화면으로 변경) */
        <div className="edit-form">
          <h3>게시글 수정</h3>
          <input 
            type="text" 
            className="edit-title-input"
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
          />
          <textarea 
            className="edit-content-textarea"
            value={editContent} 
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="edit-actions">
            <button onClick={handleUpdate} className="btn-save">저장</button>
            <button onClick={() => setIsEditMode(false)} className="btn-cancel">취소</button>
          </div>
        </div>
      )}
    </div>
  );
}