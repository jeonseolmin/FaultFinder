package com.team2.faultFind_backend.comment.repository;

import com.team2.faultFind_backend.comment.entity.Comment;
import com.team2.faultFind_backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 특정 게시글 번호(postId)에 달린 댓글들만 골라서 리스트로 가져옴
    List<Comment> findByPostId(Long postId);
    List<Comment> findByAuthorEmailOrderByIdDesc(String authorEmail);
    Optional<Comment> findById(Long id);
}