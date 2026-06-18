import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '', category: '' });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${id}`)
      .then(res => {
        setFormData({ title: res.data.title, content: res.data.content, category: res.data.category, isNotice: res.data.isNotice });
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/posts/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("수정되었습니다.");
      navigate(`/community/${id}`);
    } catch (err) {
      alert("수정 권한이 없거나 오류가 발생했습니다.");
    }
  };

  return (
    <div className="write-container">
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <input 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
        />
        <textarea 
          value={formData.content} 
          onChange={(e) => setFormData({...formData, content: e.target.value})} 
        />
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}