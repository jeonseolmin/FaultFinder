import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 
import './MyPage.css';

export default function MyPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ user: null, posts: [], comments: [] });
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('posts'); 

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 4) {
      alert("새 비밀번호는 4자리 이상이어야 합니다.");
      return;
    }

    try {
      await axiosInstance.put('/api/users/password', {
        currentPassword: currentPassword,
        newPassword: newPassword
      });

      alert("비밀번호가 성공적으로 변경되었습니다! 다시 로그인해주세요.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("Authorization");
      localStorage.removeItem("email");
      navigate('/login');

    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data); 
      } else {
        alert("비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.");
      }
    }
  };

  if (loading) return <div className="mypage-loading">로딩 중...</div>;
  if (!data.user) return null;

  return (
    <div className="mypage-dashboard">
      
      {/* 좌측 사이드바 영역 */}
      <aside className="mypage-sidebar">
        <div className="mypage-profile">
          <div className="profile-avatar">
            {data.user.name.charAt(0)}
          </div>
          <h2 className="profile-name">{data.user.name}</h2>
          <p className="profile-email">{data.user.email}</p>
        </div>

        <nav className="mypage-nav">
          <button 
            className={`nav-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            내가 쓴 글 <span className="badge">{data.posts.length}</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            내가 쓴 댓글 <span className="badge">{data.comments.length}</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'password' ? 'active-danger' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            비밀번호 변경
          </button>
        </nav>

        {userRole === 'ROLE_ADMIN' && (
          <div className="admin-section">
            <button className="btn-admin-enter" onClick={() => navigate('/admin')}>
              관리자 대시보드 입장
            </button>
          </div>
        )}
      </aside>

      {/* 우측 메인 콘텐츠 영역 */}
      <main className="mypage-content">
        <div className="content-header">
          <h2>
            {activeTab === 'posts' && '내가 쓴 글 내역'}
            {activeTab === 'comments' && '내가 쓴 댓글 내역'}
            {activeTab === 'password' && '계정 보안 설정'}
          </h2>
        </div>

        <div className="content-body">
          
          {activeTab === 'posts' && (
            <div className="list-container">
              {data.posts.length === 0 ? <div className="empty-state">작성한 글이 없습니다.</div> : null}
              {data.posts.map(post => (
                <div key={post.id} className="list-item" onClick={() => navigate(`/community/${post.id}`)}>
                  <span className="item-title">{post.title}</span>
                  <span className="item-date">{new Date(post.createdDate).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="list-container">
              {data.comments.length === 0 ? <div className="empty-state">작성한 댓글이 없습니다.</div> : null}
              {data.comments.map(comment => (
                <div key={comment.id} className="list-item flex-column" onClick={() => navigate(`/community/${comment.postId}`)}>
                  <div className="item-content">{comment.content}</div>
                  <div className="item-meta">
                    <span className="meta-highlight">원문: {comment.postTitle}</span>
                    <span className="meta-divider">|</span>
                    {new Date(comment.createdDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'password' && (
            <div className="password-change-section">
              <form onSubmit={handleChangePassword} className="password-form">
                <div className="form-group">
                  <label>현재 비밀번호 (또는 임시 비밀번호)</label>
                  <input 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호를 입력해주세요"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>새 비밀번호</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="4자 이상 입력해주세요"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>새 비밀번호 확인</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="새 비밀번호를 다시 입력해주세요"
                    required
                  />
                </div>

                <button type="submit" className="btn-change-pw">비밀번호 변경 완료</button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}