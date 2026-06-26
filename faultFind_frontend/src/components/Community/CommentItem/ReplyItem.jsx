import "../Community.css";

export default function ReplyItem({ reply, onReport }) {

    return (
        <div className="reply-item">
            <div className="reply-header">
                <span className="reply-arrow">↳</span>

                <span className="reply-author">
          {reply.author}
        </span>

                <span className="reply-date">
          {reply.createdAt
              ? new Date(reply.createdAt).toLocaleString()
              : ""}
        </span>

                <button
                    className="btn-comment-report"
                    onClick={() => onReport("COMMENT", reply.id)}
                >
                    🚨 신고
                </button>
            </div>

            <div className="reply-content">
                {reply.content}
            </div>
        </div>
    );
}