import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import LeftSidebar from "../SideBar/LeftSideBar.jsx";
import Pagination from "../../Common/Pagination.jsx";

export default function CategoryBoard({ category, title }) {
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
  const [activeSearch, setActiveSearch] = useState({
    type: initialSearchType,
    word: initialKeyword,
  });

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/community", {
          params: {
            category,
            page,
            size,
            searchType: activeSearch.word ? activeSearch.type : undefined,
            keyword: activeSearch.word || undefined,
          },
        });

        setPosts(response.data.content ?? []);
        setTotalPages(response.data.totalPages ?? 0);
      } catch (error) {
        console.error(`${title} 게시글 불러오기 실패:`, error);
      }
    };

    fetchCategoryPosts();
  }, [category, title, activeSearch, page]);

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
    setActiveSearch({ type: searchType, word: keyword.trim() });
  };

  const changePage = (nextPage) => {
    const nextParams = {
      page: String(nextPage),
    };

    if (activeSearch.word) {
      nextParams.searchType = activeSearch.type;
      nextParams.keyword = activeSearch.word;
    }

    setSearchParams(nextParams);
  };

  const categoryLabels = {
    free: "자유게시판",
    review: "사고후기",
    qna: "Q&A",
  };

  const handleWriteClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("Authorization");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate('/login');
    } else {
      navigate('/community/write');
    }
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
            <h3>{title}</h3>

            <button onClick={handleWriteClick} className="btn-write board-write-btn">
              글쓰기
            </button>
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
              <th style={{ width: "8%", minWidth: "50px", textAlign: "center", whiteSpace: "nowrap" }}>No</th>
              <th style={{ width: "10%", minWidth: "80px", textAlign: "center", whiteSpace: "nowrap" }}>카테고리</th>
              <th style={{ width: "37%", textAlign: "center" }}>제목</th>
              <th style={{ width: "9%", minWidth: "80px", textAlign: "center" }}>게시자</th>
              <th style={{ width: "21%", minWidth: "100px", textAlign: "center", whiteSpace: "nowrap" }}>날짜</th>
              <th style={{ width: "5%", minWidth: "60px", textAlign: "center", whiteSpace: "nowrap" }}>조회수</th>
              <th style={{ width: "5%", minWidth: "60px", textAlign: "center", whiteSpace: "nowrap" }}>댓글</th>
              <th style={{ width: "5%", minWidth: "60px", textAlign: "center", whiteSpace: "nowrap" }}>좋아요</th>
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
                          className="board-row"
                          style={{
                            cursor: "pointer",
                            backgroundColor: isNoticePost ? "#eff6ff" : "transparent",
                          }}
                      >
                        <td style={{ textAlign: "center" }}>
                          {isNoticePost ? (
                              <span
                                  style={{
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    fontSize: "0.85em",
                                    fontWeight: "bold",
                                  }}
                              >
                          공지
                        </span>
                          ) : (
                              post.id
                          )}
                        </td>

                        <td>{categoryLabels[post.category] || post.category}</td>

                        <td
                            style={{
                              textAlign: "left",
                              fontWeight: isNoticePost ? "700" : "500",
                              color: isNoticePost ? "#1e3a8a" : "inherit",
                            }}
                        >
                          {post.title}
                        </td>

                        <td style={{ textAlign: "center" }}>{post.author}</td>

                        <td style={{ textAlign: "center" }}>
                          {post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString()
                              : ""}
                        </td>

                        <td style={{ textAlign: "center" }}>{post.viewCount || 0}</td>
                        <td style={{ textAlign: "center" }}>{post.commentCount || 0}</td>
                        <td
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              color: "#3b82f6",
                            }}
                        >
                          {post.likeCount || 0}
                        </td>
                      </tr>
                  );
                })
            ) : (
                <tr>
                  <td
                      colSpan="8"
                      style={{
                        textAlign: "center",
                        padding: "50px 0",
                        color: "#888",
                        fontSize: "16px",
                      }}
                  >
                    검색 결과에 부합하는 게시글이 존재하지 않습니다.
                  </td>
                </tr>
            )}
            </tbody>
          </table>

          <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={changePage}
          />
        </div>
      </div>
  );
}