import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users'); // 'users' 또는 'posts'

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/dashboard');
        setData(response.data);
      } catch (error) {
        console.error("관리자 데이터 불러오기 실패", error);
        alert("관리자 권한이 없거나 접근할 수 없습니다.");
        navigate('/'); // 권한이 없으면 메인 화면으로 강제 이동
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [navigate]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#1f2937', padding: '30px', borderRadius: '12px', marginBottom: '30px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>관리자 페이지 (Admin Dashboard)</h2>
        <p style={{ margin: '0', color: '#9ca3af' }}>모든 유저와 게시글을 관리합니다.</p>
      </div>

      {/* 탭 메뉴 */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('users')}
          style={{ flex: 1, padding: '15px', fontSize: '1.1em', fontWeight: 'bold', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', borderBottom: activeTab === 'users' ? '3px solid #ef4444' : 'none', color: activeTab === 'users' ? '#ef4444' : '#9ca3af' }}
        >
          유저 관리 ({data.users.length}명)
        </button>
        <button 
          onClick={() => setActiveTab('posts')}
          style={{ flex: 1, padding: '15px', fontSize: '1.1em', fontWeight: 'bold', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', borderBottom: activeTab === 'posts' ? '3px solid #ef4444' : 'none', color: activeTab === 'posts' ? '#ef4444' : '#9ca3af' }}
        >
          게시글 관리 ({data.posts.length}개)
        </button>
      </div>

      {/* 탭 내용 영역 */}
      <div>
        {/* 유저 관리 탭 */}
        {activeTab === 'users' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th>이메일</th>
                <th>이름</th>
                <th>권한</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td style={{ color: user.role === 'ROLE_ADMIN' ? '#ef4444' : 'inherit', fontWeight: user.role === 'ROLE_ADMIN' ? 'bold' : 'normal' }}>
                    {user.role}
                  </td>
                  <td>
                    {/* 자기 자신은 강제 탈퇴 버튼 안 보이게 처리 필요 */}
                    <button style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>
                      강제 탈퇴
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 게시글 관리 탭 */}
        {activeTab === 'posts' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px' }}>No</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map(post => (
                <tr key={post.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{post.id}</td>
                  {/* 제목 누르면 해당 글로 이동 */}
                  <td style={{ cursor: 'pointer', color: '#3b82f6', textDecoration: 'underline' }} onClick={() => navigate(`/community/${post.id}`)}>
                    {post.title}
                  </td>
                  <td>{post.author}</td>
                  <td>{post.createdDate}</td>
                  <td>
                    <button style={{ padding: '6px 12px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>
                      강제 삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}