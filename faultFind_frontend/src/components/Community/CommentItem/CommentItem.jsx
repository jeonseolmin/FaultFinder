import { useState } from "react";
import "../Community.css";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";

export default function CommentItem({
                                        comment,
                                        replies = [],
                                        onReport,
                                        onReplySubmit,
                                    }) {
    const [showReplyForm, setShowReplyForm] = useState(false);

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
                    🚨 신고
                </button>

                <button
                    type="button"
                    className="btn-reply"
                    onClick={() => setShowReplyForm((prev) => !prev)}
                >
                    답글
                </button>
            </div>

            <div className="comment-body">{comment.content}</div>

            {showReplyForm && (
                <ReplyForm
                    onSubmit={(content) => {
                        onReplySubmit(comment.id, content);
                        setShowReplyForm(false);
                    }}
                />
            )}

            {replies.map((reply) => (
                <ReplyItem key={reply.id} reply={reply} onReport={onReport} />
            ))}
        </div>
    );
}