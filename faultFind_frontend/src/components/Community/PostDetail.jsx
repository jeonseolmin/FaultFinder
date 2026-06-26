import "./Community.css";

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