
export default function AdminTabs({
                                      activeTab,
                                      setActiveTab,
                                      userCount,
                                      postCount,
                                      reportCount
                                  }) {
    return (
        <div className="admin-tabs">

            <button
                className={`admin-tab-btn ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
            >
                유저 관리 ({userCount}명)
            </button>

            <button
                className={`admin-tab-btn ${activeTab === "posts" ? "active" : ""}`}
                onClick={() => setActiveTab("posts")}
            >
                게시글 관리 ({postCount}개)
            </button>

            <button
                className={`admin-tab-btn ${activeTab === "reports" ? "active" : ""}`}
                onClick={() => setActiveTab("reports")}
            >
                🚨 신고 관리 ({reportCount}건)
            </button>

        </div>
    );
}