import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import AdminTabs from "../../components/Admin/AdminTabs";
import UserManagement from "../../components/Admin/UserManagement";
import PostManagement from "../../components/Admin/PostManagement";
import ReportManagement from "../../components/Admin/ReportManagement";
import "./Admin.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ users: [], posts: [] });
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const [userPage, setUserPage] = useState(0);
  const [postPage, setPostPage] = useState(0);
  const [reportPage, setReportPage] = useState(0);

  const pageSize = 10;

  const changeUserPage = (page) => setUserPage(page);
  const changePostPage = (page) => setPostPage(page);
  const changeReportPage = (page) => setReportPage(page);


  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/api/admin/dashboard", {
          params: {
            userPage,
            userSize: pageSize,
            postPage,
            postSize: pageSize,
          },
        });

        setData({
          users: response.data.users,
          posts: response.data.posts,
        });

        const reportsResponse = await axiosInstance.get("/api/admin/reports", {
          params: {
            page: reportPage,
            size: pageSize,
          },
        });

        setReports(reportsResponse.data);
      } catch (error) {
        console.error("관리자 데이터 불러오기 실패", error);
        alert("관리자 권한이 없거나 접근할 수 없습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate, userPage, postPage, reportPage]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("정말 이 유저를 임시 탈퇴시키겠습니까?")) return;

    try {
        await axiosInstance.put(`/api/admin/users/withdraw/${id}`);
        alert("탈퇴 처리되었습니다.");

        setData((prev) => ({
            ...prev,
            users: {
                ...prev.users,
                content: prev.users.content.map((user) => 
                    user.id === id ? { ...user, role: "ROLE_WITHDRAWN" } : user
                ),
            },
        }));
    } catch (error) {
        console.error("탈퇴 처리 실패:", error);
        alert("탈퇴 처리 중 오류가 발생했습니다.");
    }
};

  const handleSuspendUser = async (user) => {
    const actionText = user.suspended ? "정지 해제" : "활동 정지";

    if (!window.confirm(`이 유저를 ${actionText} 하시겠습니까?`)) return;

    try {
      const res = await axiosInstance.put(`/api/admin/users/${user.id}/suspend`);
      alert(res.data);

      setData((prev) => ({
        ...prev,
        users: {
          ...prev.users,
          content: prev.users.content.map((u) =>
              u.id === user.id ? { ...u, suspended: !u.suspended } : u
          ),
        },
      }));
    } catch (error) {
      console.error(error);
      alert("처리 실패");
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("이 게시글을 강제 삭제하시겠습니까?")) return;

    try {
      await axiosInstance.delete(`/api/admin/posts/${id}`);
      alert("삭제되었습니다.");

      setData((prev) => ({
        ...prev,
        posts: {
          ...prev.posts,
          content: prev.posts.content.filter((post) => post.id !== id),
          totalElements: prev.posts.totalElements - 1,
        },
      }));

      setReports((prev) =>
          Array.isArray(prev) ?
              prev.filter((r) => !(r.targetType === "POST" && r.targetId === id)) : prev
      );
    } catch (error) {
      console.error(error);
      alert("삭제 실패");
    }
  };

  const handleDeleteReportedTarget = async (report) => {
    const targetName = report.targetType === "POST" ? "게시글" : "댓글";

    if (!window.confirm(`신고 접수된 이 ${targetName}을 강제 삭제하시겠습니까?`)) {
      return;
    }

    try {
      if (report.targetType === "POST") {
        await axiosInstance.delete(`/api/admin/reports/posts/${report.targetId}`);

        setData((prev) => ({
          ...prev,
          posts: {
            ...prev.posts,
            content: prev.posts.content.filter(
                (post) => post.id !== report.targetId
            ),
            totalElements: prev.posts.totalElements - 1,
          },
        }));
      }

      if (report.targetType === "COMMENT") {
        await axiosInstance.delete(`/api/admin/reports/comments/${report.targetId}`);
      }

      alert(`해당 ${targetName}이 삭제되었습니다.`);

      setReports((prev) =>
          prev.filter(
              (r) =>
                  !(r.targetType === report.targetType && r.targetId === report.targetId)
          )
      );
    } catch (error) {
      console.error("신고 대상 삭제 실패:", error);
      alert("권한이 없거나 서버에서 처리에 실패했습니다.");
    }
  };

  if (loading) {
    return <div className="admin-loading">로딩 중...</div>;
  }

  return (
    <div className="admin-container">
      <AdminTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userCount={data.users?.totalElements ?? 0}
          postCount={data.posts?.totalElements ?? 0}
          reportCount={Array.isArray(reports) ? reports.length : reports?.totalElements ?? 0}
      />

      <main className="admin-content">
        <div className="admin-header">
          <h2>관리자 대시보드</h2>
          <p>모든 유저, 게시글, 신고 내역을 통합 관리합니다.</p>
        </div>

        <div className="table-container">
          {activeTab === "users" && (
              <UserManagement
                  users={data.users?.content ?? []}
                  pageData={data.users}
                  onDeleteUser={handleDeleteUser}
                  onSuspendUser={handleSuspendUser}
                  onPageChange={changeUserPage}
              />
          )}

          {activeTab === "posts" && (
              <PostManagement
                  posts={data.posts?.content ?? []}
                  pageData={data.posts}
                  onDeletePost={handleDeletePost}
                  navigate={navigate}
                  onPageChange={changePostPage}
              />
          )}

          {activeTab === "reports" && (
              <ReportManagement
                  reports={Array.isArray(reports) ? reports : reports?.content ?? []}
                  pageData={Array.isArray(reports) ? null : reports}
                  onDeleteReportedTarget={handleDeleteReportedTarget}
                  navigate={navigate}
                  onPageChange={changeReportPage}
              />
          )}
        </div>
      </main>
    </div>
  );
}