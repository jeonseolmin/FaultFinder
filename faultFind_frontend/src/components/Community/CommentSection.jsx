import "./Community.css";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentSection({
                                           comments,
                                           currentUsername,
                                           userStatus,
                                           newComment,
                                           setNewComment,
                                           onCommentSubmit,
                                           onReport,
                                            onReplySubmit,
                                           onUpdate,
                                           onDelete
                                       }) {

    return (
        <div className="comments-section">
            <h3 className="comments-title">💬 댓글 ({comments.length})</h3>

            {userStatus.isSuspended ? (
                <div className="suspended-notice">
                    ⚠️ <strong>활동이 정지된 계정입니다.</strong> 댓글을 작성할 수 없습니다.
                </div>
            ) : (
                <CommentForm
                    value={newComment}
                    setValue={setNewComment}
                    onSubmit={onCommentSubmit}
                />
            )}

            <CommentList
                comments={comments}
                currentUsername={currentUsername}
                onReport={onReport}
                onReplySubmit={onReplySubmit}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </div>
    );
}