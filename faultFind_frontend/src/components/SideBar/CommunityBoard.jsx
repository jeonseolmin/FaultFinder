import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
import LeftSidebar from "./LeftSideBar.jsx";
import "./Community.css";

export default function CommunityBoard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 0);
  const size = 10;

  const initialSearchType = searchParams.get("searchType") || "title";
  const initialKeyword = searchParams.get("keyword") || "";

  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [searchType, setSearchType] = useState(initialSearchType);
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = {
          page,
          size,
        };

        const urlSearchType = searchParams.get("searchType");
        const urlKeyword = searchParams.get("keyword");

        if (urlKeyword) {
          params.searchType = urlSearchType || "title";
          params.keyword = urlKeyword;
        }

        const response = await axiosInstance.get("/api/community", {
          params,
        });

        setPosts(response.data.content ?? []);
        setTotalPages(response.data.totalPages ?? 0);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchPosts();
  }, [page, searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const nextParams = {
      page: "0",
    };

    if (keyword.trim()) {
      nextParams.searchType = searchType;
      nextParams.keyword = keyword.trim();
    }

    setSearchParams(nextParams);
  };

  const changePage = (nextPage) => {
    const nextParams = {
      page: String(nextPage),
    };

    const currentSearchType = searchParams.get("searchType");
    const currentKeyword = searchParams.get("keyword");

    if (currentKeyword) {
      nextParams.searchType = currentSearchType || "title";
      nextParams.keyword = currentKeyword;
    }

    setSearchParams(nextParams);
  };

  const categoryLabels = {
    free: "자유게시판",
    review: "사고후기",
    qna: "Q&A",
  };
  const renderPagination = (current, total, onPageChange) => {
    if (total <= 1) return null;

    let start = Math.max(0, current - 2);
    let end = Math.min(total - 1, current + 2);

    if (end - start < 4) {
      if (start === 0) {
        end = Math.min(total - 1, 4);
      } else if (end === total - 1) {
        start = Math.max(0, total - 5);
      }
    }

    return (
        <div className="pagination">
          <button disabled={current === 0} onClick={() => onPageChange(current - 1)}>
            이전
          </button>

          {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((page) => (
              <button
                  key={page}
                  className={page === current ? "active" : ""}
                  onClick={() => onPageChange(page)}
              >
                {page + 1}
              </button>
          ))}

          <button
              disabled={current === total - 1}
              onClick={() => onPageChange(current + 1)}
          >
            다음
          </button>
        </div>
    );
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

          </div>

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
            {posts.length > 0 ? (
                posts.map((post) => {
                  const isNoticePost = post.isNotice || post.notice;

                  return (
                      <tr
                          key={post.id}
                          onClick={() => navigate(`/community/${post.id}`)}
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
                        <td className="title-cell">{post.title}</td>
                        <td>{post.author}</td>
                        <td>
                          {post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString()
                              : ""}
                        </td>
                        <td>{post.viewCount || 0}</td>
                        <td>{post.commentCount || 0}</td>
                        <td className="like-cell">{post.likeCount || 0}</td>
                      </tr>
                  );
                })
            ) : (
                <tr>
                  <td colSpan="8" className="no-posts-cell">
                    등록된 게시글이 없습니다.
                  </td>
                </tr>
            )}
            </tbody>
          </table>
          {renderPagination(page, totalPages, changePage)}
        </div>
      </div>
  );
}