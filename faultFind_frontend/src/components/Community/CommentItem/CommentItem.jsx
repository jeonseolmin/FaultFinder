import { useState } from "react";
import "../Community.css";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";

export default function CommentItem({
                                        comment,
                                        replies = [],
                                        currentUsername,
                                        onReport,
                                        onReplySubmit,
                                        onUpdate,
                                        onDelete,
                                    }) {

    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const isAuthor =
        String(comment.authorEmail || "").trim() ===
        String(currentUsername || "").trim();

    return (
        <div className="comment-item">

            <div className="comment-meta">

                <div className="comment-info">
                    <span className="comment-author">
                        {comment.author}
                    </span>

                    <span className="comment-date">
                        {comment.createdAt
                            ? new Date(comment.createdAt).toLocaleString()
                            : ""}
                    </span>
                </div>

                <div className="comment-buttons">

                    <button
                        type="button"
                        className="btn-comment-report"
                        onClick={() => onReport("COMMENT", comment.id)}
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

                    {isAuthor && (
                        <>
                            <button
                                type="button"
                                className="btn-comment-edit"
                                onClick={() => setIsEditing(true)}
                            >
                                수정
                            </button>

                            <button
                                type="button"
                                className="btn-comment-delete"
                                onClick={() => onDelete(comment.id)}
                            >
                                삭제
                            </button>
                        </>
                    )}

                </div>

            </div>

            {isEditing ? (
                <div className="comment-edit-box">

                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />

                    <div className="comment-edit-actions">

                        <button
                            onClick={() => {
                                onUpdate(comment.id, editContent);
                                setIsEditing(false);
                            }}
                        >
                            저장
                        </button>

                        <button
                            onClick={() => {
                                setEditContent(comment.content);
                                setIsEditing(false);
                            }}
                        >
                            취소
                        </button>

                    </div>

                </div>
            ) : (
                <div className="comment-body">
                    {comment.content}
                </div>
            )}

            {showReplyForm && (
                <ReplyForm
                    onSubmit={(content) => {
                        onReplySubmit(comment.id, content);
                        setShowReplyForm(false);
                    }}
                />
            )}

            {replies.map((reply) => (
                <ReplyItem
                    key={reply.id}
                    reply={reply}
                    currentUsername={currentUsername}
                    onReport={onReport}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}