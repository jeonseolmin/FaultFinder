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

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/api/admin/dashboard");
        setData(response.data);

        const reportsResponse = await axiosInstance.get("/api/admin/reports");
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
  }, [navigate]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("정말 이 유저를 강제 탈퇴시키겠습니까?")) return;

    try {
      await axiosInstance.delete(`/api/admin/users/${id}`);
      alert("탈퇴 처리되었습니다.");

      setData((prev) => ({
        ...prev,
        users: prev.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error(error);
      alert("삭제 실패");
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
        users: prev.users.map((u) =>
            u.id === user.id ? { ...u, suspended: !u.suspended } : u
        ),
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
        posts: prev.posts.filter((post) => post.id !== id),
      }));

      setReports((prev) =>
          prev.filter((report) => !(report.targetType === "POST" && report.targetId === id))
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
          posts: prev.posts.filter((post) => post.id !== report.targetId),
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
        userCount={data.users.length}
        postCount={data.posts.length}
        reportCount={reports.length}
      />

      <main className="admin-content">
        <div className="admin-header">
          <h2>관리자 대시보드</h2>
          <p>모든 유저, 게시글, 신고 내역을 통합 관리합니다.</p>
        </div>

        <div className="table-container">
          {activeTab === "users" && (
            <UserManagement
              users={data.users}
              onDeleteUser={handleDeleteUser}
              onSuspendUser={handleSuspendUser}
            />
          )}

          {activeTab === "posts" && (
            <PostManagement
              posts={data.posts}
              onDeletePost={handleDeletePost}
              navigate={navigate}
            />
          )}

          {activeTab === "reports" && (
            <ReportManagement
              reports={reports}
              onDeleteReportedTarget={handleDeleteReportedTarget}
              navigate={navigate}
            />
          )}
        </div>
      </main>
    </div>
  );
}