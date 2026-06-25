package com.team2.faultFind_backend.post.controller;

import com.team2.faultFind_backend.post.dto.PostDto;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getPosts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String keyword) {

        // 1. 카테고리와 검색어가 모두 존재할 때
        if (category != null && !category.isEmpty() && keyword != null && !keyword.isEmpty()) {
            // "all" 카테고리(전체)에서 검색할 때의 처리 로직 추가
            if (category.equals("all")) {
                // 전체 카테고리 검색 메서드가 서비스에 없다면 새로 만들어야 할 수도 있습니다.
                // 임시로 기존 searchPosts를 쓰되, 서비스 로직에 맞게 조정 필요.
                return ResponseEntity.ok(postService.searchPosts("", searchType, keyword));
            }
            return ResponseEntity.ok(postService.searchPosts(category, searchType, keyword));
        }

        // 2. 카테고리 필터링만 적용할 때
        if (category != null && !category.isEmpty() && !category.equals("all")) {
            return ResponseEntity.ok(postService.getPostsByCategory(category));
        }

        // 3. 아무런 조건이 없을 때 (전체 반환)
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 2. 홈 화면 인기글 TOP 5 불러오기
    @GetMapping("/popular")
    public ResponseEntity<List<Post>> getPopularPosts() {
        return ResponseEntity.ok(postService.getPopularPosts());
    }

    // 3. 게시글 상세 보기
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPost(id));
    }

    // 4. 게시글 작성
    @PostMapping
    public ResponseEntity<String> writePost(@RequestBody PostDto postDto, Authentication authentication) {
        postService.createPost(postDto, authentication.getName());
        return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
    }

    // 5. 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody PostDto postDto, Authentication authentication) {
        postService.updatePost(id, postDto, authentication.getName());
        return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
    }

    // 6. 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, Authentication authentication) {
        postService.deletePost(id, authentication.getName());
        return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
    }

    // 7. 게시글 좋아요 토글
    @PostMapping("/{id}/like")
    public ResponseEntity<Boolean> toggleLike(
            @PathVariable Long id,
            Authentication authentication
    ) {
        boolean isNowLiked = postService.toggleLike(id, authentication.getName());
        return ResponseEntity.ok(isNowLiked);
    }
}