import "./Community.css";
import CommentItem from "./CommentItem";

export default function CommentList({ comments, onReport }) {
    if (comments.length === 0) {
        return (
            <div className="empty-comments">
                아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
            </div>
        );
    }

    return (
        <div className="comments-list">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReport={onReport}
                />
            ))}
        </div>
    );
}