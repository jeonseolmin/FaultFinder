import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import LeftSidebar from "./LeftSidebar"; 

export default function CategoryBoard({ category, title }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const response = await axiosInstance.get(`/api/community?category=${category}`);
        
        // 공지사항을 맨 위로 올리는 정렬 로직
        const sortedPosts = response.data.sort((a, b) => {
          const aNotice = a.isNotice || a.notice ? 1 : 0;
          const bNotice = b.isNotice || b.notice ? 1 : 0;

          // 1. 공지사항 여부가 다르면 공지사항(1)이 앞으로 오도록 정렬 (-1 반환)
          if (aNotice !== bNotice) {
            return bNotice - aNotice;
          }

          // 2. 둘 다 공지사항이거나 둘 다 일반글이면 최신글(ID가 큰 것) 순으로 정렬
          return b.id - a.id;
        });

        setPosts(sortedPosts);
      } catch (error) {
        console.error(`${title} 게시글 불러오기 실패:`, error);
      }
    };

    fetchCategoryPosts();
  }, [category, title]);

  return (
    <div className="main-container">
      
      <LeftSidebar activeTab="community" />

      <div className="board-list-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>{title}</h3>
          <button onClick={() => navigate('/community/write')} className="btn-write" style={{ width: 'auto', padding: '10px 20px', fontSize: '14px' }}>
            글 쓰기
          </button>
        </div>

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
                  아직 등록된 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}