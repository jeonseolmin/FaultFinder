import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import LeftSidebar from "../SideBar/LeftSideBar.jsx";

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>{title}</h3>
          <button onClick={() => navigate('/community/write')} className="btn-write" style={{ width: 'auto', padding: '10px 20px', fontSize: '14px' }}>
            글쓰기
          </button>
        </div>

        {/* 이미 작성해두신 CSS 기반의 검색 바 UI 추가 */}
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
          
          <button type="submit" className="btn-write" style={{ width: 'auto', padding: '0 20px', borderRadius: '6px', fontSize: '14px', height: '42px' }}>
            검색
          </button>
        </form>

        <table className="board-table">
          <thead>
            <tr>
              <th style={{ width: '8%', minWidth: '50px', textAlign: 'center', whiteSpace: 'nowrap' }}>No</th>
              <th style={{ width: '10%', minWidth: '80px', textAlign: 'center', whiteSpace: 'nowrap' }}>카테고리</th>
              <th style={{ width: '37%', textAlign: 'center' }}>제목</th>
              <th style={{ width: '9%', minWidth: '80px', textAlign: 'center' }}>게시자</th>
              <th style={{ width: '21%', minWidth: '100px', textAlign: 'center', whiteSpace: 'nowrap' }}>날짜</th>
              <th style={{ width: '5%', minWidth: '60px', textAlign: 'center', whiteSpace: 'nowrap' }}>조회수</th>
              <th style={{ width: '5%', minWidth: '60px', textAlign: 'center', whiteSpace: 'nowrap' }}>댓글</th>
              <th style={{ width: '5%', minWidth: '60px', textAlign: 'center', whiteSpace: 'nowrap' }}>좋아요</th>
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
                    className="board-row" 
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: isNoticePost ? '#eff6ff' : 'transparent' 
                    }}
                  >
                    <td style={{ textAlign: 'center' }}>
                      {isNoticePost ? (
                        <span style={{ backgroundColor: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85em', fontWeight: 'bold' }}>
                          공지
                        </span>
                      ) : (
                        post.id
                      )}
                    </td>
                    <td>{categoryLabels[post.category] || post.category}</td>
                    <td style={{ textAlign: 'left', fontWeight: isNoticePost ? '700' : '500', color: isNoticePost ? '#1e3a8a' : 'inherit' }}>
                      {post.title}
                    </td>
                    <td style={{ textAlign: 'center' }}>{post.author}</td>
                    <td style={{ textAlign: 'center' }}>{post.createdDate ? post.createdDate.split('T')[0] : (post.createdAt ? post.createdAt.split('T')[0] : '')}</td>
                    <td style={{ textAlign: 'center' }}>{post.viewCount || 0}</td>
                    <td style={{ textAlign: 'center' }}>{post.commentCount || 0}</td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>{post.likeCount || 0}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '50px 0', color: '#888', fontSize: '16px' }}>
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