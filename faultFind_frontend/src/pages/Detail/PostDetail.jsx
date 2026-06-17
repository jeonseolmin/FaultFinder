import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import './PostDetail.css';

export default function PostDetail() {
  const { id } = useParams(); // 주소창에서 게시글 ID 추출
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportConfig, setReportConfig] = useState({ targetType: '', targetId: null });
  const [reportReason, setReportReason] = useState('');

  const openReportModal = (type, id) => {
    setReportConfig({ targetType: type, targetId: id });
    setReportReason(''); // 이전 입력값 초기화
    setShowReportModal(true);
  };

  // 백엔드로 신고 데이터를 쏘는 함수
  const handleReportSubmit = async () => {
    if (!reportReason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    try {
      // 2단계에서 만든 백엔드 주소로 POST 요청!
      const response = await axiosInstance.post('/api/reports', {
        targetType: reportConfig.targetType,
        targetId: reportConfig.targetId,
        reason: reportReason
      });
      
      alert(response.data); // "신고가 정상적으로 접수되었습니다."
      setShowReportModal(false); // 모달 닫기
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // 백엔드에서 튕겨낸 중복 신고 메시지 출력
        alert(error.response.data); 
      } else {
        alert("로그인이 필요하거나 오류가 발생했습니다.");
      }
    }
  };

  const getLoginUser = () => {
    // "accessToken"을 최우선으로 가져옵니다
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("Authorization");
    
    if (token) {
      try {
        // JWT 토큰의 가운데 부분(페이로드)을 디코딩
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        // 콘솔창(F12)에 토큰 내부에 진짜 뭐가 들었는지 강제로 출력
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
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/api/community/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error("댓글 불러오기 실패", error);
      }
    };
    
    fetchComments();
    fetchPostDetail();
  }, [id]);

  // 게시글 좋아요 함수
  const handleLike = async () => {
    try {
      await axiosInstance.post(`/api/community/${id}/like`);
      // 좋아요 성공 시 화면의 숫자도 즉시 +1 해줍니다
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

  // 새 댓글을 백엔드로 보내는 함수
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.post(`/api/community/${id}/comments`, {
        content: newComment
      });
      setNewComment(""); // 입력창 비우기
      
      // 방금 쓴 댓글이 화면에 바로 보이도록 목록을 다시 불러옵니다
      const response = await axiosInstance.get(`/api/community/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 작성 실패", error);
      alert("로그인이 필요합니다.");
    }
  };

  if (loading) return <div className="loading-box">로딩 중...</div>;
  if (!post) return null;

  // 현재 로그인한 사람과 글쓴이가 같은지 판단하는 스위치
  const isAuthor = post.authorEmail === currentUsername;

  return (
    <div className="post-detail-container">
      {/* 수정 모드가 아닐 때 (일반 상세 보기) */}
      {!isEditMode ? (
        <>
          {/* 1. 게시글 헤더 */}
          <div className="detail-header">
            <h2>{post.title}</h2>
            <div className="post-meta">
              <span>작성자: {post.author}</span> | <span>{post.createdDate}</span> 
              <span style={{ marginLeft: '10px' }}>조회수 {post.viewCount || 0}</span>
            </div>
          </div>

          {/* 2. 게시글 본문 */}
          <div className="detail-content" style={{ minHeight: '200px', padding: '20px 0', fontSize: '1.1em', lineHeight: '1.6' }}>
            <p>{post.content}</p>
          </div>

          {/* 3. 액션 버튼 모음 (양쪽 정렬로 깔끔하게 배치) */}
          <div className="detail-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
            <div className="left-buttons">
              <button onClick={() => navigate(-1)} className="btn-back" style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: 'white' }}>
                목록으로
              </button>
              <button 
                onClick={handleLike} 
                style={{ padding: '8px 16px', backgroundColor: '#28fa80', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
              >
                👍 좋아요 {post.likeCount || 0}
              </button>
              <button 
                onClick={() => openReportModal('POST', id)}
                style={{ padding: '8px 16px', backgroundColor: '#ff0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
              >
                🚨 신고
              </button>
            </div>

            {/* 글쓴이 본인일 때만 우측에 수정/삭제 버튼 표시 */}
            {isAuthor && (
              <div className="right-buttons">
                <button onClick={() => setIsEditMode(true)} className="btn-edit" style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>수정</button>
                <button onClick={handleDelete} className="btn-delete" style={{ padding: '8px 16px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>삭제</button>
              </div>
            )}
          </div>

          <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

          {/* 4. 댓글 영역 (버튼 영역 밖으로 완전히 탈출) */}
          <div className="comments-section">
            <h3 style={{ marginBottom: '20px' }}>💬 댓글 ({comments.length})</h3>
            
            {/* 댓글 입력창 (위로 올리면 최신 댓글 달기가 더 편합니다) */}
            <div className="comment-input-box" style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..." 
                style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1em' }}
                onKeyDown={(e) => { if(e.key === 'Enter') handleCommentSubmit(); }} // 엔터키로도 등록 가능하게 추가!
              />
              <button 
                onClick={handleCommentSubmit}
                style={{ padding: '0 25px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                등록
              </button>
            </div>

            {/* 댓글 목록 보여주기 */}
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>
                    {comment.author} 
                    <span style={{ fontWeight: 'normal', color: '#999', fontSize: '0.8em', marginLeft: '10px' }}>
                      {new Date(comment.createdDate).toLocaleString()} {/* 날짜 포맷팅 깔끔하게 */}
                    </span>
                    <button 
                      onClick={() => openReportModal('COMMENT', comment.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9em' }}
                    >
                      🚨 신고
                    </button>
                  </div>
                  <div style={{ marginTop: '8px', color: '#555', lineHeight: '1.4' }}>{comment.content}</div>
                </div>
              ))}
              {comments.length === 0 && (
                <div style={{ textAlign: 'center', color: '#999', padding: '30px 0', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* 수정 모드일 때 (폼 화면으로 변경) */
        <div className="edit-form" style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '20px' }}>게시글 수정</h3>
          <input 
            type="text" 
            className="edit-title-input"
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <textarea 
            className="edit-content-textarea"
            value={editContent} 
            onChange={(e) => setEditContent(e.target.value)}
            style={{ width: '100%', padding: '10px', minHeight: '300px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <div className="edit-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button onClick={handleUpdate} className="btn-save" style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>저장</button>
            <button onClick={() => setIsEditMode(false)} className="btn-cancel" style={{ padding: '10px 20px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'red', cursor: 'pointer' }}>취소</button>
          </div>
        </div>
      )}
      {showReportModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#ef4444' }}>🚨 신고하기</h3>
            <p style={{ fontSize: '0.9em', color: '#555', marginBottom: '10px' }}>
              부적절한 내용인가요? 신고 사유를 명확히 적어주세요.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="예: 욕설 및 비방, 불법 광고, 도배 등"
              style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '15px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setShowReportModal(false)}
                style={{ padding: '8px 16px', border: '1px solid #ccc', backgroundColor: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                취소
              </button>
              <button 
                onClick={handleReportSubmit}
                style={{ padding: '8px 16px', border: 'none', backgroundColor: '#ef4444', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                신고 제출
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}