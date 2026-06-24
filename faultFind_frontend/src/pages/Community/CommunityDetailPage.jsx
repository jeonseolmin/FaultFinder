import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance.js';
import './Community.css';

export default function CommunityDetailPage() {
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
  
  // 💡 [추가] 사용자가 이 글에 좋아요를 눌렀는지 여부를 관리하는 상태
  const [isLiked, setIsLiked] = useState(false);

  // 유저 상태 관리 (정지 여부 파악)
  const [userStatus, setUserStatus] = useState({ isSuspended: false });

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
      const response = await axiosInstance.post('/api/reports', {
        targetType: reportConfig.targetType,
        targetId: reportConfig.targetId,
        reason: reportReason
      });
      
      alert(response.data); // "신고가 정상적으로 접수되었습니다."
      setShowReportModal(false); // 모달 닫기
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data); 
      } else {
        alert("로그인이 필요하거나 오류가 발생했습니다.");
      }
    }
  };

  const getLoginUser = () => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("Authorization");
    
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        console.log("정밀 분석 - 내 토큰 내용물(페이로드):", payload);
        return payload.sub || payload.username || payload.email || payload.id;
      } catch (e) {
        console.error("JWT 토큰 디코딩 실패:", e);
      }
    }
    return localStorage.getItem("email") || localStorage.getItem("username");
  };

  const currentUsername = getLoginUser();

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/community/${id}`);
        setPost(response.data);
        setEditTitle(response.data.title);
        setEditContent(response.data.content);

        // 💡 [추가] 만약 백엔드 response.data에 해당 유저의 좋아요 여부(예: isLiked)가 포함되어 온다면 세팅해줍니다.
        // 만약 없다면, 아래 handleLike에서 토글되는 데이터로만 화면이 제어됩니다.
        if (response.data.isLiked !== undefined) {
          setIsLiked(response.data.isLiked);
        }

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
    
    // 현재 접속한 유저의 정보를 불러와 정지 여부를 체크합니다.
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/users/me'); 
        setUserStatus({ isSuspended: res.data.isSuspended || res.data.suspended });
      } catch (e) {
        console.log("로그인하지 않았거나 유저 정보를 가져올 수 없습니다.");
      }
    };
    
    fetchUserInfo();
    fetchComments();
    fetchPostDetail();
  }, [id]);

  const handleLike = async () => {
    if (!currentUsername) {
      alert("로그인 후 이용할 수 있는 기능입니다.");
      // 원하신다면 여기서 로그인 페이지로 이동시킬 수도 있습니다.
      // navigate('/login'); 
      return; // 👈 여기서 함수를 강제 종료시켜서 백엔드로 요청 자체가 안 가게 막습니다.
    }
    try {
      // 1. 백엔드에 요청을 보냅니다.
      const response = await axiosInstance.post(`/api/community/${id}/like`);
      
      // 2. 백엔드가 돌려준 결과값 (true: 좋아요 됨, false: 취소 됨)
      const isNowLiked = response.data; 

      // 3. 결과에 따라 화면의 숫자를 똑똑하게 바꿉니다!
      if (isNowLiked) {
        setPost({ ...post, likeCount: post.likeCount + 1 });
        setIsLiked(true);
      } else {
        setPost({ ...post, likeCount: post.likeCount - 1 });
        setIsLiked(false);
      }
      
    } catch (error) {
      console.error("좋아요 실패", error);
      alert("로그인이 필요하거나 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(`/api/community/${id}`);
      alert("게시글이 삭제되었습니다.");
      navigate('/community'); 
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

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

  const handleCommentSubmit = async () => {
    if (!currentUsername) {
      alert("로그인 후 이용할 수 있는 기능입니다.");
      // 원하신다면 여기서 로그인 페이지로 이동시킬 수도 있습니다.
      // navigate('/login'); 
      return; // 여기서 함수를 강제 종료시켜서 백엔드로 요청 자체가 안 가게 막습니다.
    }

    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.post(`/api/community/${id}/comments`, {
        content: newComment
      });
      setNewComment(""); 
      
      const response = await axiosInstance.get(`/api/community/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 작성 실패", error);
      alert("현재 활동 정지 상태입니다.");
    }
  };

  if (loading) return <div className="loading-box">로딩 중...</div>;
  if (!post) return null;

  const isAuthor = post.authorEmail === currentUsername;

  return (
    <div className="post-detail-container">
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

          {/* 3. 액션 버튼 모음 */}
          <div className="detail-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
            <div className="left-buttons">
              <button onClick={() => navigate(-1)} className="btn-back" style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: 'white' }}>
                목록으로
              </button>
              <button 
                onClick={handleLike} 
                style={{ 
                  fontSize:12 , 
                  padding: '9px 12px', 
                  fontWeight: 'bold', 
                  backgroundColor: isLiked ? '#98ebee' : '#f9faf9', 
                  color: 'black', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer', 
                  marginLeft: '10px' 
                }}
              >
                {isLiked ? '❤' : '🤍'} {post.likeCount || 0}
              </button>
              <button 
                onClick={() => openReportModal('POST', id)}
                style={{ fontSize:12 , padding: '9px 16px', fontWeight: 'bold', backgroundColor: '#faf9f8', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
              >
                🚨 신고
              </button>
            </div>

            {isAuthor && (
              <div className="right-buttons">
                <button onClick={() => setIsEditMode(true)} className="btn-edit" style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>수정</button>
                <button onClick={handleDelete} className="btn-delete" style={{ padding: '8px 16px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>삭제</button>
              </div>
            )}
          </div>

          <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

          {/* 4. 댓글 영역 */}
          <div className="comments-section">
            <h3 style={{ fontSize:22 , fontFamily: 'Pretendard' , marginBottom: '20px' }}>💬 댓글 ({comments.length})</h3>
            
            {/* 정지된 유저일 경우 입력창 대신 알림 표시 */}
            {userStatus.isSuspended ? (
              <div style={{ padding: '20px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', textAlign: 'center', borderRadius: '8px', marginBottom: '30px', color: '#9a3412' }}>
                ⚠️ <strong>활동이 정지된 계정입니다.</strong> 댓글을 작성할 수 없습니다.
              </div>
            ) : (
              <div className="comment-input-box" style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <input 
                  type="text" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..." 
                  style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1em' }}
                  onKeyDown={(e) => { if(e.key === 'Enter') handleCommentSubmit(); }}
                />
                <button 
                  onClick={handleCommentSubmit}
                  style={{ padding: '0 25px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  등록
                </button>
              </div>
            )}

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>
                    {comment.author} 
                    <span style={{ fontWeight: 'normal', color: '#999', fontSize: '0.8em', marginLeft: '10px' }}>
                      {new Date(comment.createdDate).toLocaleString()} 
                    </span>
                    <button 
                      onClick={() => openReportModal('COMMENT', comment.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9em' }}
                    >
                      &nbsp; 🚨 신고
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
        /* 수정 모드일 때 */
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
      
      {/* 신고 모달창 (완벽 유지) */}
      {showReportModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontfamily: 'Pretendard', fontWeight: 'bold', marginTop: 0, marginBottom: '15px', color: '#ef4444' }}>🚨 신고하기</h3>
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