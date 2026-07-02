import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Pagination from "../../Common/Pagination.jsx";
import "./MyPage.css";

export default function MyPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const postPage = Number(searchParams.get("postPage") || 0);
  const commentPage = Number(searchParams.get("commentPage") || 0);
  const pageSize = 8;

  const [data, setData] = useState({
    user: {
      userName: "",
      email: "",
    },
    posts: {
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 0,
    },
    comments: {
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const response = await axiosInstance.get("/api/mypage/info", {
          params: {
            postPage,
            postSize: pageSize,
            commentPage,
            commentSize: pageSize,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("마이페이지 정보 불러오기 실패", error);
        alert("로그인이 필요합니다.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPageData();
  }, [postPage, commentPage, navigate]);

  const changePostPage = (nextPage) => {
    setSearchParams({
      postPage: String(nextPage),
      commentPage: String(commentPage),
    });
  };

  const changeCommentPage = (nextPage) => {
    setSearchParams({
      postPage: String(postPage),
      commentPage: String(nextPage),
    });
  };

  const getUserRoleFromToken = () => {
    const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("Authorization");

    if (!token) return null;

    try {
      const payload = JSON.parse(window.atob(token.split(".")[1]));
      return payload.role;
    } catch (e) {
      console.error("토큰 파싱 실패", e);
      return null;
    }
  };

  const userRole = getUserRoleFromToken();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 4) {
      alert("새 비밀번호는 4자리 이상이어야 합니다.");
      return;
    }

    try {
      await axiosInstance.put("/api/users/password", {
        currentPassword,
        newPassword,
      });

      alert("비밀번호가 성공적으로 변경되었습니다! 다시 로그인해주세요.");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("Authorization");
      localStorage.removeItem("email");

      navigate("/login");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);

      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert("비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.");
      }
    }
  };

  const handleWithdrawSelf = async () => {
    if (!window.confirm("정말 탈퇴하시겠습니까? 탈퇴 시 계정은 즉시 임시 탈퇴 상태로 전환됩니다.")) {
      return;
    }

    try {
      await axiosInstance.put("/api/mypage/withdraw");
      
      alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("Authorization");
      localStorage.removeItem("email");
      
      window.location.href = "/";
    } catch (error) {
      console.error("탈퇴 에러:", error);
      alert("탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  if (loading) return <div className="mypage-loading">로딩 중...</div>;
  if (!data.user) return null;
  const posts = data.posts?.content ?? [];
  const comments = data.comments?.content ?? [];

  return (
      <div className="mypage-dashboard">
        <aside className="mypage-sidebar">
          <div className="mypage-profile">
            <div className="profile-avatar">
              {(data.user?.userName ?? "").charAt(0)}
            </div>

            <h2 className="profile-name">{data.user?.userName}</h2>
            <p className="profile-email">{data.user?.email}</p>
          </div>

          <nav className="mypage-nav">
            <button
                className={`nav-btn ${activeTab === "posts" ? "active" : ""}`}
                onClick={() => setActiveTab("posts")}
            >
              내가 쓴 글{" "}
            </button>

            <button
                className={`nav-btn ${activeTab === "comments" ? "active" : ""}`}
                onClick={() => setActiveTab("comments")}
            >
              내가 쓴 댓글{" "}
            </button>

            <button
                className={`nav-btn ${
                    activeTab === "password" ? "active-danger" : ""
                }`}
                onClick={() => setActiveTab("password")}
            >
              비밀번호 변경
            </button>
          </nav>

          {userRole === "ROLE_ADMIN" && (
              <div className="admin-section">
                <button
                    className="btn-admin-enter"
                    onClick={() => navigate("/admin")}
                >
                  관리자 대시보드 입장
                </button>
              </div>
          )}

          <div className="withdraw-section">
            <button
                className="btn-withdraw-self"
                onClick={handleWithdrawSelf}
            >
              회원 탈퇴
            </button>
          </div>
        </aside>

        <main className="mypage-content">
          <div className="content-header">
            <h2>
              {activeTab === "posts" && "내가 쓴 글 내역"}
              {activeTab === "comments" && "내가 쓴 댓글 내역"}
              {activeTab === "password" && "계정 보안 설정"}
            </h2>
          </div>

          <div className="content-body">
            {activeTab === "posts" && (
                <>
                  <div className="list-container">
                    {posts.length === 0 && (
                        <div className="empty-state">작성한 글이 없습니다.</div>
                    )}

                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="list-item"
                            onClick={() => navigate(`/community/${post.id}`)}
                        >
                          <span className="item-title">{post.title}</span>
                          <span className="item-date">
            {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : ""}
          </span>
                        </div>
                    ))}
                  </div>

                  <Pagination
                      pageData={data.posts}
                      onPageChange={changePostPage}
                  />
                </>
            )}

            {activeTab === "comments" && (
                <>
                  <div className="list-container">
                    {comments.length === 0 && (
                        <div className="empty-state">작성한 댓글이 없습니다.</div>
                    )}

                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="list-item flex-column"
                            onClick={() => navigate(`/community/${comment.postId}`)}
                        >
                          <div className="item-content">{comment.content}</div>

                          <div className="item-meta">
                            <span className="meta-highlight">원문: {comment.postTitle}</span>
                            <span className="meta-divider">|</span>
                            {comment.createdAt
                                ? new Date(comment.createdAt).toLocaleDateString()
                                : ""}
                          </div>
                        </div>
                    ))}
                  </div>

                  <Pagination
                      pageData={data.comments}
                      onPageChange={changeCommentPage}
                  />
                </>
            )}

            {activeTab === "password" && (
                <div className="password-change-section">
                  <form onSubmit={handleChangePassword} className="password-form">
                    <div className="form-group">
                      <label>현재 비밀번호 (또는 임시 비밀번호)</label>
                      <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="현재 비밀번호를 입력해주세요"
                          required
                      />
                    </div>

                    <div className="form-group">
                      <label>새 비밀번호</label>
                      <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="4자 이상 입력해주세요"
                          required
                      />
                    </div>

                    <div className="form-group">
                      <label>새 비밀번호 확인</label>
                      <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="새 비밀번호를 다시 입력해주세요"
                          required
                      />
                    </div>

                    <button type="submit" className="btn-change-pw">
                      비밀번호 변경 완료
                    </button>
                  </form>
                </div>
            )}
          </div>
        </main>
      </div>
  );
}