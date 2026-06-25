import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
import LeftSidebar from "./LeftSideBar.jsx";
import "./Community.css";
export default function CommunityBoard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // 검색 관련 상태
  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");
  const [activeSearch, setActiveSearch] = useState({ type: "title", word: "" });

  // 게시글 불러오기 로직
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = "/api/community";
        const queryParams = [];

        // 검색어가 있을 때만 파라미터 추가
        if (activeSearch.word) {
          queryParams.push(`searchType=${activeSearch.type}`);
          queryParams.push(`keyword=${encodeURIComponent(activeSearch.word)}`);
        }

        if (queryParams.length > 0) {
          url += "?" + queryParams.join("&");
        }

        const response = await axiosInstance.get(url);

        // 공지사항 최상단, 나머지는 최신순 정렬
        const sortedPosts = response.data.sort((a, b) => {
          const aNotice = a.isNotice || a.notice ? 1 : 0;
          const bNotice = b.isNotice || b.notice ? 1 : 0;

          if (aNotice !== bNotice) {
            return bNotice - aNotice;
          }
          return b.id - a.id;
        });

        setPosts(sortedPosts);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchPosts();
  }, [activeSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch({ type: searchType, word: keyword });
  };

  const categoryLabels = {
    free: "자유게시판",
    review: "사고후기",
    qna: "Q&A",
  };

  return (
    <div className="main-container">
      <LeftSidebar activeTab="community" />

      <div className="board-list-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3>전체 게시글</h3>
          <button
            onClick={() => navigate("/community/write")}
            className="btn-write"
            style={{ width: "auto", padding: "10px 20px", fontSize: "14px" }}
          >
            글쓰기
          </button>
        </div>

        {/* 검색 필터 영역 */}
        <form onSubmit={handleSearchSubmit} className="search-filter-bar">
          <select
            className="select-box"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="author">작성자</option>
          </select>

          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력해 주세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-write"
            style={{
              width: "auto",
              padding: "0 20px",
              borderRadius: "6px",
              fontSize: "14px",
              height: "42px",
            }}
          >
            검색
          </button>
        </form>

        {/* 게시글 테이블 영역 */}
        <table className="board-table">
          <thead>
            <tr>
              <th>No</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>게시자</th>
              <th>날짜</th>
              <th>조회수</th>
              <th>댓글</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => {
                const isNoticePost = post.isNotice || post.notice;

                return (
                  <tr
                    key={post.id}
                    onClick={() => navigate(`/community/${post.id}`)}
                    /* 공지사항일 경우 notice-row 클래스를 추가합니다 */
                    className={`board-row ${isNoticePost ? "notice-row" : ""}`}
                  >
                    <td>
                      {isNoticePost ? (
                        <span className="badge-notice">공지</span>
                      ) : (
                        post.id
                      )}
                    </td>
                    <td>{categoryLabels[post.category] || post.category}</td>
                    {/* 인라인 스타일 대신 title-cell 클래스 적용 */}
                    <td className="title-cell">{post.title}</td>
                    <td>{post.author}</td>
                    <td>
                      {post.createdDate ? post.createdDate.split("T")[0] : ""}
                    </td>
                    <td>{post.viewCount || 0}</td>
                    <td>{post.commentCount || 0}</td>
                    {/* 인라인 스타일 대신 like-cell 클래스 적용 */}
                    <td className="like-cell">{post.likeCount || 0}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                {/* 인라인 스타일 대신 no-posts-cell 클래스 적용 */}
                <td colSpan="8" className="no-posts-cell">
                  등록된 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
