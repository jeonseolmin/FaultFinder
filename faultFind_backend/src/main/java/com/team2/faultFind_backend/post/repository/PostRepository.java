package com.team2.faultFind_backend.post.repository;

import com.team2.faultFind_backend.post.dto.PostRequest;
import com.team2.faultFind_backend.post.dto.PostResponse;
import com.team2.faultFind_backend.post.entity.Post; // 🌟 다른 패키지의 Entity 임포트
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<PostResponse> findByAuthorEmailOrderByIdDesc(String authorEmail);
    List<PostResponse> findTop5ByOrderByLikeCountDesc();
    @Query("SELECT p FROM Post p ORDER BY p.isNotice DESC, p.createdAt DESC")
    List<PostResponse> findAllNoticeFirst();
}