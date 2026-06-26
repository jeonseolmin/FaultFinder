package com.team2.faultFind_backend.post.repository;

import com.team2.faultFind_backend.post.entity.Post; // 🌟 다른 패키지의 Entity 임포트
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Post> findByCategoryAndTitleContainingIgnoreCase(String category, String keyword, Pageable pageable);

    Page<Post> findByContentContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Post> findByCategoryAndContentContainingIgnoreCase(String category, String keyword, Pageable pageable);

    Page<Post> findByAuthorContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Post> findByCategoryAndAuthorContainingIgnoreCase(String category, String keyword, Pageable pageable);

    Page<Post> findAllByOrderByIsNoticeDescCreatedAtDesc(Pageable pageable);

    Page<Post> findByCategoryOrderByIsNoticeDescCreatedAtDesc(String category, Pageable pageable);

    List<Post> findTop5ByOrderByLikeCountDesc();

    Page<Post> findByCategory(String category,Pageable pageable);

    Page <Post> findByAuthorEmailOrderByIdDesc(String email, Pageable pageable);
}