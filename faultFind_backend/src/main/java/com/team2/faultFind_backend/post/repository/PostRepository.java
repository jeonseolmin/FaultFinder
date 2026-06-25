package com.team2.faultFind_backend.post.repository;

import com.team2.faultFind_backend.post.entity.Post; // 🌟 다른 패키지의 Entity 임포트
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorEmailOrderByIdDesc(String authorEmail);
    List<Post> findTop5ByOrderByLikeCountDesc();
    @Query("SELECT p FROM Post p ORDER BY p.isNotice DESC, p.createdAt DESC")
    List<Post> findAllNoticeFirst();
    List<Post> findByCategory(String category);

    // 제목에 검색어가 포함된 카테고리별 게시글 조회
    List<Post> findByCategoryAndTitleContainingIgnoreCase(String category, String title);

    // 내용에 검색어가 포함된 카테고리별 게시글 조회
    List<Post> findByCategoryAndContentContainingIgnoreCase(String category, String content);

    // 작성자에 검색어가 포함된 카테고리별 게시글 조회
    List<Post> findByCategoryAndAuthorContainingIgnoreCase(String category, String author);

    List<Post> findByTitleContainingIgnoreCase(String title);
    List<Post> findByContentContainingIgnoreCase(String content);
    List<Post> findByAuthorContainingIgnoreCase(String author);
}