import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance.js';
import './CommunityEditPage.css';

export default function CommunityEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', content: '', category: '' });

    useEffect(() => {
        axiosInstance.get(`/api/community/${id}`)
            .then(res => {
                setFormData({
                    title: res.data.title,
                    content: res.data.content,
                    category: res.data.category,
                    isNotice: res.data.isNotice
                });
            })
            .catch(err => {
                console.error("게시글 정보를 불러오지 못했습니다.", err);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/community/${id}`, formData);
            alert("수정되었습니다.");
            navigate(`/community/${id}`);
        } catch (err) {
            alert("수정 권한이 없거나 오류가 발생했습니다.");
        }
    };

    return (
        <div className="edit-page-container">
            <h2>게시글 수정</h2>
            <form onSubmit={handleSubmit} className="edit-form-wrapper">
                <input
                    className="edit-page-title-input"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <textarea
                    className="edit-page-content-textarea"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
                <div className="edit-page-actions">
                    <button type="submit" className="btn-base btn-save">수정 완료</button>
                    <button type="button" onClick={() => navigate(-1)} className="btn-base btn-cancel">취소</button>
                </div>
            </form>
        </div>
    );
}