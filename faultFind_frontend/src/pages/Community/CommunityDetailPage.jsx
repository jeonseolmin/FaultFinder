import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance.js";
import PostDetail from "../../components/Community/PostDetail.jsx";
import CommentSection from "../../components/Community/CommentSection.jsx";
import EditPostForm from "../../components/Community/EditPostForm.jsx";
import ReportModal from "../../components/Community/ReportModal.jsx";

export default function CommunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState(post?.category || "free");
  const [editTitle, setEditTitle] = useState(post?.title || "");
  const [editContent, setEditContent] = useState(post?.content || "");
  const [editFile, setEditFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    targetType: "",
    targetId: null,
  });
  const [reportReason, setReportReason] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [userStatus, setUserStatus] = useState({ isSuspended: false });

  const openReportModal = (type, targetId) => {
    setReportConfig({ targetType: type, targetId: targetId });
    setReportReason("");
    setShowReportModal(true);
  };
  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await axiosInstance.delete(`/api/community/comments/${commentId}`);

      await fetchComments();
    } catch (error) {
      console.error(error);
      alert("댓글 삭제 실패");
    }
  };
  const handleCommentUpdate = async (commentId, content) => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.put(`/api/community/comments/${commentId}`, {
        content,
      });

      await fetchComments();
    } catch (error) {
      console.error(error);
      alert("댓글 수정 실패");
    }
  };

  const handleReportSubmit = async () => {
    if (!reportReason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/reports", {
        targetType: reportConfig.targetType,
        targetId: reportConfig.targetId,
        reason: reportReason,
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
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("Authorization");

    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(window.atob(base64));
        return payload.sub || payload.username || payload.email || payload.id;
      } catch (e) {
        console.error("JWT 토큰 디코딩 실패:", e);
      }
    }
    return localStorage.getItem("email") || localStorage.getItem("username");
  };

  const currentUsername = getLoginUser();
  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/api/community/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    }
  };
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

  const fetchUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/api/users/me");
      setUserStatus({
        isSuspended: res.data.isSuspended || res.data.suspended,
      });
    } catch (e) {
      console.log(e + "로그인하지 않았거나 유저 정보를 가져올 수 없습니다.");
    }
  };

  useEffect(() => {
    const init = async () => {
      fetchComments();
      fetchUserInfo();
      fetchPostDetail();
    };
    init();
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
      navigate("/community");
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
        category: post.category,
      });
      alert("게시글이 수정되었습니다.");
      setPost({ ...post, title: editTitle, content: editContent });
      setIsEditMode(false);
    } catch (error) {
      console.error("수정 실패", error);
      alert("수정 권한이 없거나 오류가 발생했습니다.");
    }
  };
  const handleReplySubmit = async (parentId, content) => {
    if (!currentUsername) {
      alert("로그인 후 이용할 수 있는 기능입니다.");
      return;
    }

    if (!content.trim()) {
      alert("답글 내용을 입력해주세요.");
      return;
    }

    try {
      await axiosInstance.post(`/api/community/${id}/comments`, {
        content,
        parentId,
      });

      await fetchComments();
    } catch (error) {
      console.error("답글 등록 실패:", error);
      alert("답글 등록 중 오류가 발생했습니다.");
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
        content: newComment,
        parentId: null,
      });

      setNewComment("");
      await fetchComments();
    } catch (error) {
      console.error("댓글 작성 실패", error);
      alert("현재 활동 정지 상태입니다.");
    }
  };

  const handleEditSave = async () => {
    const submitData = new FormData();
    submitData.append("category", editCategory);
    submitData.append("title", editTitle);
    submitData.append("content", editContent);

    if (editFile) {
        submitData.append("file", editFile);
    }

    try {
        await axios.put(`/api/community/${id}`, submitData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("accessToken") || localStorage.getItem("token")
            }
        });
        
        alert("수정이 완료되었습니다.");
        setIsEditMode(false);
        fetchPostDetail();
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 권한이 없거나 오류가 발생했습니다.");
    }
  };

  const handleEditCancel = () => {
    setIsEditMode(false);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditCategory(post.category);
    setPreviewUrl(null);
    setEditFile(null);
  };

  if (loading) return <div className="loading-box">로딩 중...</div>;
  if (!post) return null;

  const isAuthor = post.authorEmail === currentUsername;

  return (
    <div className="post-detail-container">
      {!isEditMode ? (
        <>
          <PostDetail
            post={post}
            postId={id}
            isAuthor={isAuthor}
            isLiked={isLiked}
            onBack={() => navigate(-1)}
            onLike={handleLike}
            onEdit={() => setIsEditMode(true)}
            onDelete={handleDelete}
            onReport={openReportModal}
          />

          <hr className="detail-divider" />

          <CommentSection
            comments={comments}
            userStatus={userStatus}
            newComment={newComment}
            setNewComment={setNewComment}
            currentUsername={currentUsername}
            onCommentSubmit={handleCommentSubmit}
            onReplySubmit={handleReplySubmit}
            onUpdate={handleCommentUpdate}
            onDelete={handleCommentDelete}
            onReport={openReportModal}
          />
        </>
      ) : (
        <EditPostForm
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editContent={editContent}
          setEditContent={setEditContent}
          editFile={editFile}
          setEditFile={setEditFile}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}

      <ReportModal
        show={showReportModal}
        reason={reportReason}
        setReason={setReportReason}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
