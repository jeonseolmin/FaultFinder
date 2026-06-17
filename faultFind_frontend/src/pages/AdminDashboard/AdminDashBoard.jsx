import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({ users: [], posts: [] });

  const [reports, setReports] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        // 기존 유저 & 게시글 데이터 불러오기
        const response = await axiosInstance.get('/api/admin/dashboard');
        setData(response.data);

        // 신고 내역 데이터 불러오기
        const reportsResponse = await axiosInstance.get('/api/admin/reports');
        setReports(reportsResponse.data);

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
        <h2 style={{ margin: '0 0 10px 0' }}>관리자 페이지 </h2>
        <p style={{ margin: '0', color: '#9ca3af' }}>모든 유저, 게시글, 신고 내역을 관리합니다.</p>
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
        {/* 신고 관리 탭 버튼 */}
        <button 
          onClick={() => setActiveTab('reports')}
          style={{ flex: 1, padding: '15px', fontSize: '1.1em', fontWeight: 'bold', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', borderBottom: activeTab === 'reports' ? '3px solid #ef4444' : 'none', color: activeTab === 'reports' ? '#ef4444' : '#9ca3af' }}
        >
          🚨 신고 관리 ({reports.length}건)
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

        {/* 🌟 [추가] 신고 관리 탭 */}
        {activeTab === 'reports' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#fee2e2', borderBottom: '2px solid #fca5a5' }}>
                <th style={{ padding: '12px', color: '#b91c1c' }}>신고 ID</th>
                <th style={{ color: '#b91c1c' }}>신고자</th>
                <th style={{ color: '#b91c1c' }}>구분</th>
                <th style={{ color: '#b91c1c' }}>대상 번호</th>
                <th style={{ color: '#b91c1c' }}>신고 사유</th>
                <th style={{ color: '#b91c1c' }}>일시</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id} style={{ borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{report.id}</td>
                  <td>{report.reporterEmail}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '0.85em', fontWeight: 'bold',
                      backgroundColor: report.targetType === 'POST' ? '#dbeafe' : '#fef3c7',
                      color: report.targetType === 'POST' ? '#1e40af' : '#92400e'
                    }}>
                      {report.targetType === 'POST' ? '게시글' : '댓글'}
                    </span>
                  </td>
                  <td 
                    style={{ cursor: 'pointer', color: '#3b82f6', textDecoration: 'underline' }} 
                    onClick={() => report.targetType === 'POST' && navigate(`/community/${report.targetId}`)}
                  >
                    #{report.targetId}번
                  </td>
                  <td style={{ color: '#dc2626', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {report.reason}
                  </td>
                  <td style={{ color: '#9ca3af', fontSize: '0.9em' }}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', color: '#9ca3af' }}>접수된 신고 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}