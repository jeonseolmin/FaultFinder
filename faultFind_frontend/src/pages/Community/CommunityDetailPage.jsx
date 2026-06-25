<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance.js';
import './CommunityDetailPage.css';

export default function CommunityDetailPage() {
    const { id } = useParams();
=======
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
import "./Community.css";

export default function CommunityDetailPage() {
    const {id} = useParams(); // 주소창에서 게시글 ID 추출
>>>>>>> f70eb86f0bdae7be2dff2582807d870127e952a7
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
<<<<<<< HEAD
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

=======
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportConfig, setReportConfig] = useState({
        targetType: "", targetId: null,
    });
    const [reportReason, setReportReason] = useState("");

    // 💡 [추가] 댓글 수정 및 대댓글 관리를 위한 상태들
    const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글 ID
    const [editingCommentContent, setEditingCommentContent] = useState(""); // 수정 중인 댓글 내용
    const [replyingCommentId, setReplyingCommentId] = useState(null); // 현재 답글(대댓글) 작성 중인 부모 댓글 ID
    const [newReply, setNewReply] = useState(""); // 작성 중인 대댓글 내용

    // 💡 [추가] 사용자가 이 글에 좋아요를 눌렀는지 여부를 관리하는 상태
    const [isLiked, setIsLiked] = useState(false);

    // 유저 상태 관리 (정지 여부 파악)
    const [userStatus, setUserStatus] = useState({isSuspended: false});

    const openReportModal = (type, id) => {
        setReportConfig({targetType: type, targetId: id});
        setReportReason(""); // 이전 입력값 초기화
        setShowReportModal(true);
    };

    // 백엔드로 신고 데이터를 쏘는 함수
>>>>>>> f70eb86f0bdae7be2dff2582807d870127e952a7
    const handleReportSubmit = async () => {
        if (!reportReason.trim()) {
            alert("신고 사유를 입력해주세요.");
            return;
        }

        try {
<<<<<<< HEAD
            const response = await axiosInstance.post('/api/reports', {
                targetType: reportConfig.targetType,
                targetId: reportConfig.targetId,
                reason: reportReason
            });

            alert(response.data);
            setShowReportModal(false);

=======
            const response = await axiosInstance.post("/api/reports", {
                targetType: reportConfig.targetType, targetId: reportConfig.targetId, reason: reportReason,
            });

            alert(response.data); // "신고가 정상적으로 접수되었습니다."
            setShowReportModal(false); // 모달 닫기
>>>>>>> f70eb86f0bdae7be2dff2582807d870127e952a7
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                alert("로그인이 필요하거나 오류가 발생했습니다.");
            }
        }
<<<<<<< HEAD
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
                console.log("로그인하지 않았거나 유저 정보를 가져올 수 없습니다.");
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
=======
    };

    const getLoginUser = () => {
        const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("Authorization");

        if (token) {
            try {
                const base64Url = token.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
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
    const fetchPostDetail = async () => {
        try {
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
            const res = await axiosInstance.get("/api/users/me");
            setUserStatus({
                isSuspended: res.data.isSuspended || res.data.suspended,
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                await Promise.all([
                    fetchUserInfo(),
                    fetchComments(),
                    fetchPostDetail(),
                ]);
            } finally {
                setLoading(false);
            }
        };
        loadData();
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
                setPost({...post, likeCount: post.likeCount + 1});
                setIsLiked(true);
            } else {
                setPost({...post, likeCount: post.likeCount - 1});
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
            navigate("/community");
        } catch (error) {
            console.error("삭제 실패", error);
            alert("삭제 권한이 없거나 오류가 발생했습니다.");
        }
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/api/community/${id}`, {
                title: editTitle, content: editContent, category: post.category,
            });
            alert("게시글이 수정되었습니다.");
            setPost({...post, title: editTitle, content: editContent});
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
                content: newComment,
            });
            setNewComment("");
            fetchComments();

            const response = await axiosInstance.get(`/api/community/${id}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error("댓글 작성 실패", error);
            alert("현재 활동 정지 상태입니다.");
        }
    };

    // 💡 [추가] 댓글 수정 제출 핸들러
    const handleCommentUpdate = async (commentId) => {
        if (!editingCommentContent.trim()) {
            alert("수정할 내용을 입력해주세요.");
            return;
        }
        try {
            // API 주소는 백엔드 설계에 맞게 조절하세요 (예: /api/comments/1)
            await axiosInstance.put(`/api/community/comments/${commentId}`, {
                content: editingCommentContent,
                commentId : commentId,
            });
            alert("댓글이 수정되었습니다.");
            setEditingCommentId(null);
            fetchComments();
        } catch (error) {
            console.error("댓글 수정 실패", error);
            alert("수정 권한이 없거나 오류가 발생했습니다.");
        }
    };

    // 💡 [추가] 댓글 삭제 핸들러 (원할 경우 사용)
    const handleCommentDelete = async (commentId) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
        try {
            await axiosInstance.delete(`/api/community/comments/${commentId}`);
            alert("댓글이 삭제되었습니다.");
            fetchComments();
        } catch (error) {
            console.error("댓글 삭제 실패", error);
            alert("삭제 권한이 없거나 오류가 발생했습니다.");
        }
    };

    // 💡 [추가] 대댓글(답글) 작성 제출 핸들러
    const handleReplySubmit = async (parentId) => {
        if (!currentUsername) {
            alert("로그인 후 이용할 수 있는 기능입니다.");
            return;
        }
        if (!newReply.trim()) {
            alert("답글 내용을 입력해주세요.");
            return;
        }
        try {
            // 대댓글 API는 대개 부모 댓글 ID(parentId)를 바디나 URL에 포함합니다.
            await axiosInstance.post(`/api/community/${id}/comments`, {
                content: newReply, parentId: parentId, // 백엔드 엔티티 구조에 맞춰 키값을 변경하세요
            });
            setNewReply("");
            setReplyingCommentId(null);
            fetchComments();
        } catch (error) {
            console.error("답글 작성 실패", error);
            alert("오류가 발생했거나 활동 정지 상태입니다.");
        }
    };

    if (loading) return <div className="loading-box">로딩 중...</div>;
    if (!post) return null;

    const isAuthor = post.authorEmail === currentUsername;

    return (<div className="post-detail-container">
            {!isEditMode ? (<>
                    {/* 1. 게시글 헤더 */}
                    <div className="detail-header">
                        <h2>{post.title}</h2>
                        <div className="post-meta">
                            <span>작성자: {post.author}</span> |{" "}
                            <span>{post.createdDate}</span>
                            <span className="view-count" >조회수 {post.viewCount || 0}</span>
                        </div>
                    </div>

                    {/* 2. 게시글 본문 */}
                    <div className="detail-content">
                        <p>{post.content}</p>
                    </div>

                    {/* 3. 액션 버튼 모음 */}
                    <div
                        className="detail-actions">
                        <div className="left-buttons">
                            <button
                                onClick={() => navigate(-1)}
                                className="btn-back">
                                목록으로
                            </button>
                            <button className="btn-like"
                                onClick={handleLike}>
                                {isLiked ? "❤" : "🤍"} {post.likeCount || 0}
                            </button>
                            <button className="btn-report"
                                onClick={() => openReportModal("POST", id)}>
                                🚨 신고
                            </button>
                        </div>

                        {isAuthor && (<div className="right-buttons">
                                <button
                                    onClick={() => setIsEditMode(true)}
                                    className="btn-edit">
                                    수정
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="btn-delete">
                                    삭제
                                </button>
                            </div>)}
                    </div>

                    <hr className="detail-divider"/>

                    {/* 4. 댓글 영역 */}
                    <div className="comments-section">
                        <h3 className="comment-title">
                            💬 댓글 ({comments.length})
                        </h3>

                        {/* 정지된 유저일 경우 입력창 대신 알림 표시 */}
                        {userStatus.isSuspended ? (<div className="suspended-notice">
                                ⚠️ <strong>활동이 정지된 계정입니다.</strong> 댓글을 작성할 수 없습니다.
                            </div>) : (<div className="comment-input-box">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="댓글을 입력하세요..."
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleCommentSubmit();
                                    }}
                                />
                                <button onClick={handleCommentSubmit}>등록</button>
                            </div>)}

                        <div className="comments-list">
                            {comments.map((comment) => {
                                // 💡 [조건] 대댓글 계층 구조 시 시각적인 여백(마진)을 줌 (백엔드에 parentId 필드가 있다고 가정)
                                const isReply = !!comment.parentId;

                                return (<div
                                        key={comment.id}
                                        className={`comment-item ${isReply ? "reply" : ""}`}
                                    >
                                        {/* 댓글 헤더 */}
                                        <div className="comment-header">
                                            <div className="comment-author">
                                                {isReply && (<span
                                                        className="reply-arrow"
                                                    >
                            ↳
                          </span>)}
                                                {comment.author}
                                                <span className="comment-date">
                          {new Date(comment.createdDate).toLocaleString()}
                        </span>
                                            </div>

                                            {/* 댓글 관리 버튼 (신고 / 수정 / 삭제) */}
                                            <div className="comment-edit-box">
                                                {!isReply && (<button  className="comment-save-btn"
                                                        onClick={() => {
                                                            setReplyingCommentId(replyingCommentId === comment.id ? null : comment.id,);
                                                            setNewReply("");
                                                        }}
                                                    >
                                                        답글
                                                    </button>)}

                                                {/* 본인 댓글이면 수정/삭제 노출, 타인 글이면 신고 노출 */}
                                                {comment.authorEmail === currentUsername ? (<>
                                                        <button className="comment-save-btn"
                                                                onClick={() => {
                                                                    setEditingCommentId(comment.id);
                                                                    setEditingCommentContent(comment.content);
                                                                }}
                                                        >
                                                            수정
                                                        </button>
                                                        <button className="comment-cancel-btn"
                                                                onClick={() => handleCommentDelete(comment.id)}
                                                        >
                                                            삭제
                                                        </button>
                                                    </>) : (<button className="comment-report-btn"
                                                                    onClick={() => openReportModal("COMMENT", comment.id)}
                                                    >
                                                        🚨 신고
                                                    </button>)}
                                            </div>
                                        </div>

                                        {/* 댓글 본문 영역 (수정 모드 여부에 따라 다르게 렌더링) */}
                                        {editingCommentId === comment.id ? (<div
                                            >
                                                <input
                                                    type="text"
                                                    value={editingCommentContent}
                                                    onChange={(e) => setEditingCommentContent(e.target.value)}

                                                />
                                                <button className= "comment-save-btn"
                                                    onClick={() => handleCommentUpdate(comment.id)}

                                                >
                                                    저장
                                                </button>
                                                <button className = "comment-cancel-btn"
                                                    onClick={() => setEditingCommentId(null)}
                                                >
                                                    취소
                                                </button>
                                            </div>) : (<div
                                            >
                                                {comment.content}
                                            </div>)}

                                        {/* 대댓글(답글) 입력창 */}
                                        {replyingCommentId === comment.id && (<div className="reply-input-box">
                                                <input
                                                    type="text"
                                                    placeholder="답글을 입력하세요..."
                                                    value={newReply}
                                                    onChange={(e) => setNewReply(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") handleReplySubmit(comment.id);
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleReplySubmit(comment.id)}
                                                >
                                                    등록
                                                </button>
                                            </div>)}
                                    </div>);
                            })}

                            {comments.length === 0 && (<div>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</div>)}
                        </div>
                    </div>
                </>) : (/* 수정 모드일 때 */
                <div className="edit-form">
                    <h3 style={{marginBottom: "20px"}}>게시글 수정</h3>
>>>>>>> f70eb86f0bdae7be2dff2582807d870127e952a7
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
<<<<<<< HEAD
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
=======
                        <button
                            onClick={handleUpdate}
                            className="btn-save">
                            저장
                        </button>
                        <button
                            onClick={() => setIsEditMode(false)}
                            className="btn-cancel">취소
                        </button>
                    </div>
                </div>)}

            {/* 신고 모달창 (완벽 유지) */}
            {showReportModal && (<div className="report-modal-backdrop">
                    <div className="report-modal">
                        <h3>🚨 신고하기</h3>

                        <p>부적절한 내용인가요? 신고 사유를 명확히 적어주세요.</p>

                        <textarea
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="ex) 욕설 및 비방, 불법 광고, 도배 등"
                        />

                        <div className="report-modal-actions">
                            <button className="report-cancel-btn" onClick={() => setShowReportModal(false)}>
                                취소
                            </button>

                            <button className="report-submit-btn" onClick={handleReportSubmit}>
                                신고하기
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>);
}
>>>>>>> f70eb86f0bdae7be2dff2582807d870127e952a7
