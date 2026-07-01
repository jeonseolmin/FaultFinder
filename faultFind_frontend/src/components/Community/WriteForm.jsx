import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
import "./Write.css";

export default function WriteForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "free",
    title: "",
    content: "",
    notice: false,
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // 1. 첨부파일 상태 추가
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 컴포넌트 렌더링 시 토큰을 해독하여 관리자 권한 확인
  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("Authorization");

    if (token) {
      try {
        // JWT 토큰은 세 부분으로 나뉘며, 두 번째 부분(Payload)에 권한 정보가 있습니다.
        const payloadBase64 = token.split(".")[1];
        const decodedJson = atob(payloadBase64);
        const decodedData = JSON.parse(decodedJson);

        // 스프링 시큐리티 설정에 따라 키 값이 'auth' 또는 'role'일 수 있습니다.
        const userRole = decodedData.auth || decodedData.role;

        if (userRole === "ROLE_ADMIN") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("토큰 해독 실패:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 2. 첨부파일 변경 핸들러 추가
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // 선택한 파일이 이미지인지 확인 (image/png, image/jpeg 등)
      if (selectedFile.type.startsWith("image/")) {
        // 브라우저가 임시로 사진 주소를 만들어서 썸네일로 띄워줌
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(imageUrl);
      } else {
        // 이미지가 아니면 썸네일 초기화
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    // 3. JSON 방식 대신 FormData(택배 상자) 방식으로 변경
    const submitData = new FormData();
    submitData.append("category", formData.category);
    submitData.append("title", formData.title);
    submitData.append("content", formData.content);
    submitData.append("notice", formData.notice);

    // 파일이 선택되었을 때만 FormData에 추가
    if (file) {
      submitData.append("file", file);
    }

    try {
      // ✨ 4. 헤더에 multipart/form-data 설정 추가
      const response = await axiosInstance.post("/api/community", submitData);

      alert(response.data);
      navigate("/community");
    } catch (error) {
      console.error("글 등록 실패:", error);
      alert("현재 활동 정지 상태이거나 서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="write-container">
      <div className="write-header">
        <h2>새 게시글 작성</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label>카테고리</label>
          <select
            className="write-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="free">자유게시판</option>
            <option value="review">사고후기</option>
            <option value="qna">Q&A</option>
          </select>
        </div>

        {/* 토큰 해독 결과 isAdmin이 true일 때만 렌더링 */}
        {isAdmin && (
          <div
            className="write-form-group"
            style={{
              backgroundColor: "#f0f4f8",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: 0,
              }}
            >
              <input
                type="checkbox"
                name="notice"
                className="write-notice-checkbox"
                checked={formData.notice}
                onChange={handleChange}
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
              <span
                style={{ fontSize: "1em", fontWeight: "700", color: "#1e3a8a" }}
              >
                📢 이 게시글을 공지사항으로 등록하기
              </span>
            </label>
          </div>
        )}

        <div className="write-form-group">
          <label>제목</label>
          <input
            type="text"
            className="write-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="write-form-group">
          <label>내용</label>
          <textarea
            className="write-textarea"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="자유롭게 의견과 경험을 나누어 주세요."
          ></textarea>
        </div>

        <div>
          <input type="file" onChange={handleFileChange} />

          {/* 썸네일 이미지가 있으면 화면에 보여줌 */}
          {previewUrl && (
            <div style={{ marginTop: "15px" }}>
              <p
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
               미리보기
              </p>
              <img
                src={previewUrl}
                alt="미리보기"
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
            </div>
          )}
        </div>

        {/* 5. 파일 업로드 input 요소 추가 */}
        <div className="write-form-group">
          <label>첨부 파일</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="write-input"
            style={{ padding: "10px 0", border: "none" }}
          />
        </div>

        <div className="write-actions">
          <Link to="/community" className="btn-cancel">
            취소
          </Link>
          <button type="submit" className="btn-submit">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
