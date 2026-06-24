import React from "react";
import "../../pages/Admin/AdminPage";

export default function AdminTabs({
  activeTab,
  setActiveTab,
  userCount,
  postCount,
  reportCount,
}) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-profile">
        <div className="profile-avatar">A</div>
        <h2 className="profile-name">관리자</h2>
        <p className="profile-email">admin@test.com</p>
      </div>

      <nav className="admin-nav">
        <button
          className={`nav-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 유저 관리 <span className="badge">{userCount}</span>
        </button>

        <button
          className={`nav-btn ${activeTab === "posts" ? "active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          📝 게시글 관리 <span className="badge">{postCount}</span>
        </button>

        <button
          className={`nav-btn ${activeTab === "reports" ? "active-danger" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          🚨 신고 관리 <span className="badge badge-danger">{reportCount}</span>
        </button>
      </nav>
    </aside>
  );
}