import "./Community.css";

export default function EditPostForm({
  editCategory,
  setEditCategory,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  setEditFile,
  previewUrl,
  setPreviewUrl,
  onSave,
  onCancel,
}) {
  // 파일이 선택되었을 때 실행되는 함수
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setEditFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(imageUrl);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  return (
    <div
      className="edit-form-container"
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>게시글 수정</h3>

      {/* 카테고리 수정 영역 */}
      <div className="edit-form-group" style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          카테고리
        </label>
        <select
          className="edit-select"
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="free">자유게시판</option>
          <option value="review">사고후기</option>
          <option value="qna">Q&A</option>
        </select>
      </div>

      {/* 기존 제목 수정 영역 */}
      <div className="edit-form-group" style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          제목
        </label>
        <input
          type="text"
          className="edit-title-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      {/* 기존 내용 수정 영역 */}
      <div className="edit-form-group" style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          내용
        </label>
        <textarea
          className="edit-content-textarea"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          style={{
            width: "100%",
            minHeight: "200px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      {/* 첨부 파일 수정 영역 */}
      <div className="edit-form-group" style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          첨부 파일 수정 (선택)
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ padding: "10px 0" }}
        />

        {previewUrl && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f9fafb",
              borderRadius: "5px",
            }}
          >
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

      <div
        className="edit-actions"
        style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
      >
        <button
          onClick={onCancel}
          className="btn-base btn-cancel"
          style={{
            backgroundColor: "#e5e7eb",
            color: "#374151",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          취소
        </button>
        <button
          onClick={onSave}
          className="btn-base btn-save"
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}
