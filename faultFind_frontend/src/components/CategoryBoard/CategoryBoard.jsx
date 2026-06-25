import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import LeftSidebar from "../SideBar/LeftSideBar.jsx";
import "./CategoryBoard.css";

export default function CategoryBoard({ category, title }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 검색 관련 상태 변수 추가
  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");

  // 실제 API 요청에 사용할 검색 조건 상태 (검색 버튼을 누를 때만 변경됨)
  const [activeSearch, setActiveSearch] = useState({ type: "title", word: "" });

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        // 검색 조건이 있으면 URL 뒤에 파라미터로 붙여서 보냄
        let url = `/api/community?category=${category}`;
        if (activeSearch.word) {
          url += `&searchType=${activeSearch.type}&keyword=${encodeURIComponent(activeSearch.word)}`;
        }

        const response = await axiosInstance.get(url);

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
        console.error(`${title} 게시글 불러오기 실패:`, error);
      }
    };

    fetchCategoryPosts();
  }, [category, title, activeSearch]); // activeSearch가 바뀔 때마다 다시 서버에서 조회함

  // 검색어 제출 함수
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch({ type: searchType, word: keyword });
  };

  return (
      <div className="main-container">
        <LeftSidebar activeTab="community" />

        <div className="board-list-container">
          <div className="category-header">
            <h3>{title}</h3>
            <button onClick={() => navigate('/community/write')} className="btn-write category-write-btn">
              글쓰기
            </button>
          </div>

          {/* 검색 바 UI */}
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

            <button type="submit" className="btn-write category-search-btn">
              검색
            </button>
          </form>

          <table className="board-table">
            <thead>
            <tr>
              <th className="col-no">No</th>
              <th className="col-category">카테고리</th>
              <th className="col-title">제목</th>
              <th className="col-author">게시자</th>
              <th className="col-date">날짜</th>
              <th className="col-view">조회수</th>
              <th className="col-comment">댓글</th>
              <th className="col-like">좋아요</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => {
                  const isNoticePost = post.isNotice || post.notice;
                  const categoryLabels = {
                    free: '자유게시판',
                    review: '사고후기',
                    qna: 'Q&A'
                  };

                  return (
                      <tr
                          key={post.id}
                          onClick={() => navigate(`/community/${post.id}`)}
                          className={`board-row ${isNoticePost ? 'notice-row' : ''}`}
                      >
                        <td className="center-cell">
                          {isNoticePost ? (
                              <span className="badge-notice">공지</span>
                          ) : (
                              post.id
                          )}
                        </td>
                        <td className="center-cell">{categoryLabels[post.category] || post.category}</td>
                        <td className={`title-cell ${isNoticePost ? 'notice-title' : ''}`}>
                          {post.title}
                        </td>
                        <td className="center-cell">{post.author}</td>
                        <td className="center-cell">
                          {post.createdDate ? post.createdDate.split('T')[0] : (post.createdAt ? post.createdAt.split('T')[0] : '')}
                        </td>
                        <td className="center-cell">{post.viewCount || 0}</td>
                        <td className="center-cell">{post.commentCount || 0}</td>
                        <td className="like-cell">{post.likeCount || 0}</td>
                      </tr>
                  );
                })
            ) : (
                <tr>
                  <td colSpan="8" className="empty-cell">
                    검색 결과에 부합하는 게시글이 존재하지 않습니다.
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
}