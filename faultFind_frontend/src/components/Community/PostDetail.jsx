import "./Community.css";

const isImage = (fileName) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
};

export default function PostDetail({
                                       post,
                                       postId,
                                       isAuthor,
                                       isLiked,
                                       onBack,
                                       onLike,
                                       onEdit,
                                       onDelete,
                                       onReport,
                                   }) {
    return (
        <>
            <div className="detail-header">
                <h2>{post.title}</h2>
                <div className="post-meta">
                    <span>작성자: {post.author}</span> |{" "}
                    <span>
            {post.createdAt
                ? post.createdAt.substring(0, 19).replace("T", " ")
                : ""}
          </span>
                    <span className="meta-view">조회수 {post.viewCount || 0}</span>
                </div>
            </div>

            <div className="detail-content-body">
                <p>{post.content}</p>
            </div>
            
            {post.files && post.files.length > 0 && (
                <div className="post-files-container" style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#374151" }}>📎 첨부파일</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {post.files.map((file, index) => (
                            <li key={index} style={{ marginBottom: "15px" }}> {/* 사진과 버튼이 겹치지 않게 */}
                                
                                {/* 사진 파일이면 <img> 태그로 본문에 썸네일 먼저 출력 */}
                                {isImage(file.originalFileName) && (
                                    <div style={{ marginBottom: "10px" }}>
                                        <img
                                            src={`https://faultfinder.link${file.fileUrl.startsWith('/') ? '' : '/'}${file.fileUrl}`}
                                            alt={file.originalFileName}
                                            style={{ maxWidth: "100%", maxHeight: "500px", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                        />
                                    </div>
                                )}

                                {/* 다운로드 링크 */}
                                <a
                                    href={`https://faultfinder.link${file.fileUrl.startsWith('/') ? '' : '/'}${file.fileUrl}`}
                                    download={file.originalFileName}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#2563eb", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}
                                >
                                    💾 {file.originalFileName}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <div className="detail-actions-row">
                <div className="left-buttons">
                    <button onClick={onBack} className="btn-base btn-back">
                        목록으로
                    </button>

                    <button
                        onClick={onLike}
                        className={`btn-base btn-like ${isLiked ? "active" : "inactive"}`}
                    >
                        {isLiked ? "❤" : "🤍"} {post.likeCount || 0}
                    </button>

                    <button
                        onClick={() => onReport("POST", postId)}
                        className="btn-base btn-report"
                    >
                        🚨 신고
                    </button>
                </div>

                {isAuthor && (
                    <div className="right-buttons">
                        <button onClick={onEdit} className="btn-base btn-edit">
                            수정
                        </button>
                        <button onClick={onDelete} className="btn-base btn-delete">
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}