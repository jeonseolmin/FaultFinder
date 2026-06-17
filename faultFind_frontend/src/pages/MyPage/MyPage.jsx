import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; // 경로 맞게 수정!

export default function MyPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ user: null, posts: [], comments: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'comments'

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const response = await axiosInstance.get('/api/mypage/info');
        setData(response.data);
      } catch (error) {
        console.error("마이페이지 정보 불러오기 실패", error);
        alert("로그인이 필요합니다.");
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchMyPageData();
  }, [navigate]);

  const getUserRoleFromToken = () => {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("Authorization");
      if (!token) return null;
      try {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        return payload.role;
      } catch (e) {
        return null;
      }
    };

    const userRole = getUserRoleFromToken();

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;
  if (!data.user) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      {/* 👤 상단 프로필 영역 */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '30px', borderRadius: '12px', marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>{data.user.name} 님의 마이페이지</h2>
        <p style={{ margin: '0', color: '#6b7280' }}>✉️ {data.user.email}</p>
      </div>

      {/* 탭 메뉴 */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('posts')}
          style={{ flex: 1, padding: '15px', fontSize: '1.1em', fontWeight: 'bold', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', borderBottom: activeTab === 'posts' ? '3px solid #3b82f6' : 'none', color: activeTab === 'posts' ? '#3b82f6' : '#9ca3af' }}
        >
          내가 쓴 글 ({data.posts.length})
        </button>
        <button 
          onClick={() => setActiveTab('comments')}
          style={{ flex: 1, padding: '15px', fontSize: '1.1em', fontWeight: 'bold', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', borderBottom: activeTab === 'comments' ? '3px solid #3b82f6' : 'none', color: activeTab === 'comments' ? '#3b82f6' : '#9ca3af' }}
        >
          내가 쓴 댓글 ({data.comments.length})
        </button>
      </div>

      {/* 탭 내용 영역 */}
      <div>
        {/* 내가 쓴 글 목록 */}
        {activeTab === 'posts' && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.posts.length === 0 ? <p style={{ textAlign: 'center', color: '#999' }}>작성한 글이 없습니다.</p> : null}
            {data.posts.map(post => (
              <li key={post.id} onClick={() => navigate(`/community/${post.id}`)} style={{ padding: '15px', borderBottom: '1px solid #eee', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{post.title}</span>
                <span style={{ color: '#999', fontSize: '0.9em' }}>{new Date(post.createdDate).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 내가 쓴 댓글 목록 */}
        {activeTab === 'comments' && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.comments.length === 0 ? <p style={{ textAlign: 'center', color: '#999' }}>작성한 댓글이 없습니다.</p> : null}
            {data.comments.map(comment => (
              // comment.post.id 대신 comment.postId 로 수정
              <li key={comment.id} onClick={() => navigate(`/community/${comment.post.Id}`)} style={{ padding: '15px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                <div style={{ color: '#555', marginBottom: '8px' }}>{comment.content}</div>
                <div style={{ fontSize: '0.85em', color: '#999' }}>
                  <span style={{ color: '#3b82f6' }}>원문: {comment.postTitle}</span> | {new Date(comment.createdDate).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
        {userRole === 'ROLE_ADMIN' && (
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px dashed #ccc', textAlign: 'center' }}>
            <h4 style={{ color: '#ef4444', marginBottom: '10px' }}>관리자 전용 메뉴</h4>
            <button 
              onClick={() => navigate('/admin')} // 설정해두신 어드민 페이지 라우터 주소
              style={{ 
                width: '100%', 
                padding: '12px 20px', 
                backgroundColor: '#1f2937', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '1em',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              관리자 대시보드 입장
            </button>
          </div>
        )}
      </div>
    </div>
  );
}