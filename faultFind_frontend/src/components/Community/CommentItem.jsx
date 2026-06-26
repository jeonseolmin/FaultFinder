import "./Community.css";

export default function CommentItem({ comment, onReport }) {
    return (
        <div className="comment-item">
            <div className="comment-meta">
                {comment.author}

                <span className="comment-date">
          {comment.createdAt
              ? new Date(comment.createdAt).toLocaleString()
              : ""}
        </span>

                <button
                    type="button"
                    onClick={() => onReport("COMMENT", comment.id)}
                    className="btn-comment-report"
                >
                    &nbsp; 🚨 신고
                </button>
            </div>

            <div className="comment-body">{comment.content}</div>
        </div>
    );
}