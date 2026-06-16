package com.team2.faultFind_backend.comment.repository;

import com.team2.faultFind_backend.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 특정 게시글 번호(postId)에 달린 댓글들만 골라서 리스트로 가져옴
    List<Comment> findByPostId(Long postId);
    List<Comment> findByAuthorOrderByIdDesc(String author);
}