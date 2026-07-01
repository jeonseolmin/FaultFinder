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
    
    const handleDownload = async (fileUrl, originalFileName, e) => {
        e.preventDefault(); // 브라우저가 새 탭에서 사진을 여는 것을 방지

        try {
            const fullUrl = `https://faultfinder.link${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
            
            // 1. fetch로 파일을 백그라운드에서 받아옴
            const response = await fetch(fullUrl);
            const blob = await response.blob();

            // 2. 브라우저 메모리에 가상의 주소 생성
            const url = window.URL.createObjectURL(blob);

            // 3. 임시 a 태그를 만들어 강제로 클릭(다운로드) 유발
            const a = document.createElement('a');
            a.href = url;
            a.download = originalFileName;
            document.body.appendChild(a);
            a.click();

            // 4. 생성했던 임시 태그와 주소 청소
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("다운로드 실패:", error);
            alert("파일 다운로드 중 오류가 발생했습니다.");
        }
    };

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

                                {/* ✨ 수정된 다운로드 링크 (onClick 이벤트로 강제 다운로드 연결) */}
                                <a
                                    href={`https://faultfinder.link${file.fileUrl.startsWith('/') ? '' : '/'}${file.fileUrl}`}
                                    onClick={(e) => handleDownload(file.fileUrl, file.originalFileName, e)}
                                    style={{ color: "#2563eb", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px", cursor: "pointer" }}
                                >
                                    💾 {file.originalFileName} 다운로드
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