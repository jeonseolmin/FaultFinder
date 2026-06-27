import "./Community.css";

export default function EditPostForm({
                                         editTitle,
                                         setEditTitle,
                                         editContent,
                                         setEditContent,
                                         onSave,
                                         onCancel,
                                     }) {
    return (
        <div className="edit-form-container">
            <h3>게시글 수정</h3>

            <input
                type="text"
                className="edit-title-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
                className="edit-content-textarea"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
            />

            <div className="edit-actions">
                <button onClick={onSave} className="btn-base btn-save">
                    저장
                </button>
                <button onClick={onCancel} className="btn-base btn-cancel">
                    취소
                </button>
            </div>
        </div>
    );
}