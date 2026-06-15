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

  // 토큰이나 로컬스토리지에 저장해 둔 현재 로그인 유저의 식별자(ID 또는 이름)
  // (로그인 시점에 저장해 두었던 키값을 꺼내옵니다)
  const currentUsername = localStorage.getItem("username"); 

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/posts/${id}`);
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

  // 게시글 삭제 함수
  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(`/api/posts/${id}`);
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
      await axiosInstance.put(`/api/posts/${id}`, {
        title: editTitle,
        content: editContent
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

  // 🌟 현재 로그인한 사람과 글쓴이가 같은지 판단하는 스위치
  const isAuthor = post.writer === currentUsername;

  return (
    <div className="post-detail-container">
      {/* 수정 모드가 아닐 때 (일반 상세 보기) */}
      {!isEditMode ? (
        <>
          <div className="detail-header">
            <h2>{post.title}</h2>
            <div className="post-meta">
              <span>작성자: {post.writer}</span> | <span>{post.createdDate}</span>
            </div>
          </div>
          <div className="detail-content">
            <p>{post.content}</p>
          </div>

          <div className="detail-actions">
            <button onClick={() => navigate(-1)} className="btn-back">목록으로</button>
            
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