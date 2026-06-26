import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance.js';
import './Community.css';

export default function CommunityDetailPage() {
  const { id } = useParams();
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
  const [isLiked, setIsLiked] = useState(false);
  const [userStatus, setUserStatus] = useState({ isSuspended: false });

  const openReportModal = (type, targetId) => {
    setReportConfig({ targetType: type, targetId: targetId });
    setReportReason('');
    setShowReportModal(true);
  };

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
      
      alert(response.data);
      setShowReportModal(false);
      
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
    
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/users/me'); 
        setUserStatus({ isSuspended: res.data.isSuspended || res.data.suspended });
      } catch (e) {
        console.log(e+"로그인하지 않았거나 유저 정보를 가져올 수 없습니다.");
      }
    };
    
    fetchUserInfo();
    fetchComments();
    fetchPostDetail();
  }, [id, navigate]);

  const handleLike = async () => {
    if (!currentUsername) {
      alert("로그인 후 이용할 수 있는 기능입니다.");
      return;
    }
    try {
      const response = await axiosInstance.post(`/api/community/${id}/like`);
      const isNowLiked = response.data; 

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
      return;
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
          <div className="detail-header">
            <h2>{post.title}</h2>
            <div className="post-meta">
              <span>작성자: {post.author}</span> | 
              <span>{post.createdDate ? post.createdDate.substring(0, 19).replace('T', ' ') : ''}</span> 
              <span className="meta-view">조회수 {post.viewCount || 0}</span>
            </div>
          </div>

          <div className="detail-content-body">
            <p>{post.content}</p>
          </div>

          <div className="detail-actions-row">
            <div className="left-buttons">
              <button onClick={() => navigate(-1)} className="btn-base btn-back">
                목록으로
              </button>
              <button 
                onClick={handleLike} 
                className={`btn-base btn-like ${isLiked ? 'active' : 'inactive'}`}
              >
                {isLiked ? '❤' : '🤍'} {post.likeCount || 0}
              </button>
              <button 
                onClick={() => openReportModal('POST', id)}
                className="btn-base btn-report"
              >
                🚨 신고
              </button>
            </div>

            {isAuthor && (
              <div className="right-buttons">
                <button onClick={() => setIsEditMode(true)} className="btn-base btn-edit">수정</button>
                <button onClick={handleDelete} className="btn-base btn-delete">삭제</button>
              </div>
            )}
          </div>

          <hr className="detail-divider" />

          <div className="comments-section">
            <h3 className="comments-title">💬 댓글 ({comments.length})</h3>
            
            {userStatus.isSuspended ? (
              <div className="suspended-notice">
                ⚠️ <strong>활동이 정지된 계정입니다.</strong> 댓글을 작성할 수 없습니다.
              </div>
            ) : (
              <div className="comment-input-box">
                <input 
                  type="text" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..." 
                  className="comment-input"
                  onKeyDown={(e) => { if(e.key === 'Enter') handleCommentSubmit(); }}
                />
                <button onClick={handleCommentSubmit} className="btn-comment-submit">
                  등록
                </button>
              </div>
            )}

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-meta">
                    {comment.author} 
                    <span className="comment-date">
                      {new Date(comment.createdDate).toLocaleString()} 
                    </span>
                    <button 
                      onClick={() => openReportModal('COMMENT', comment.id)}
                      className="btn-comment-report"
                    >
                      &nbsp; 🚨 신고
                    </button>
                  </div>
                  <div className="comment-body">{comment.content}</div>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="empty-comments">
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="edit-form-container">
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
            <button onClick={handleUpdate} className="btn-base btn-save">저장</button>
            <button onClick={() => setIsEditMode(false)} className="btn-base btn-cancel">취소</button>
          </div>
        </div>
      )}
      
      {showReportModal && (
        <div className="report-modal-overlay">
          <div className="report-modal-content">
            <h3 className="report-modal-title">🚨 신고하기</h3>
            <p className="report-modal-desc">
              부적절한 내용인가요? 신고 사유를 명확히 적어주세요.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="예: 욕설 및 비방, 불법 광고, 도배 등"
              className="report-textarea"
            />
            <div className="report-modal-actions">
              <button onClick={() => setShowReportModal(false)} className="btn-base btn-report-cancel">
                취소
              </button>
              <button onClick={handleReportSubmit} className="btn-base btn-report-submit">
                신고 제출
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}