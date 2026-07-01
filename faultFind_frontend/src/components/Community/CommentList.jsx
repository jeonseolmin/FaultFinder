import "./Community.css";
import CommentItem from "./CommentItem/CommentItem";

export default function CommentList({ comments, onReport, onReplySubmit,onUpdate,onDelete }) {
    const parentComments = comments.filter((comment) => comment.parentId === null);

    const getReplies = (parentId) => {
        return comments.filter((comment) => comment.parentId === parentId);
    };

    if (parentComments.length === 0) {
        return (
            <div className="empty-comments">
                아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
            </div>
        );
    }

    return (
        <div className="comments-list">
            {parentComments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    replies={getReplies(comment.id)}
                    onReport={onReport}
                    onReplySubmit={onReplySubmit}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}