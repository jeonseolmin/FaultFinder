package com.team2.faultFind_backend.post.controller;

import com.team2.faultFind_backend.post.dto.PostRequest;
import com.team2.faultFind_backend.post.dto.PostResponse;
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

    // 1. 게시글 목록 불러오기 (공지 상단 고정)
    @GetMapping
    public ResponseEntity<List<Post>> getPosts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String keyword) {

        // 카테고리와 검색어가 모두 존재할 때
        if (category != null && !category.isEmpty() && keyword != null && !keyword.isEmpty()) {
            // "all" 카테고리(전체)에서 검색할 때의 처리 로직 추가
            if (category.equals("all")) {
                // 전체 카테고리 검색 메서드가 서비스에 없다면 새로 만들어야 할 수도 있습니다.
                // 임시로 기존 searchPosts를 쓰되, 서비스 로직에 맞게 조정 필요.
                return ResponseEntity.ok(postService.searchPosts("", searchType, keyword));
            }
            return ResponseEntity.ok(postService.searchPosts(category, searchType, keyword));
        }

        // 카테고리 필터링만 적용할 때
        if (category != null && !category.isEmpty() && !category.equals("all")) {
            return ResponseEntity.ok(postService.getPostsByCategory(category));
        }

        // 검색어가 입력되었을 때 (카테고리 유무 상관없이 service로 넘김)
        if (keyword != null && !keyword.trim().isEmpty()) {
            return ResponseEntity.ok(postService.searchPosts(category, searchType, keyword));
        }

        //  검색어는 없고, 특정 카테고리 탭(자유, QnA 등)을 눌렀을 때
        if (category != null && !category.trim().isEmpty() && !category.equals("all")) {
            return ResponseEntity.ok(postService.getPostsByCategory(category));
        }

        // 아무 조건이 없을 때 (메인 커뮤니티 첫 화면)
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 2. 홈 화면 인기글 TOP 5 불러오기
    @GetMapping("/popular")
    public ResponseEntity<List<PostResponse>> getPopularPosts() {
        return ResponseEntity.ok(postService.getPopularPosts());
    }

    // 3. 게시글 상세 보기
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPost(id));
    }

    // 4. 게시글 작성
    @PostMapping
    public ResponseEntity<String> writePost(@RequestBody  PostRequest postRequest, Authentication authentication) {
        postService.createPost(postRequest, authentication.getName());
        return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
    }

    // 5. 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody PostRequest postRequest, Authentication authentication) {
        postService.updatePost(id, postRequest, authentication.getName());
        return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
    }

    // 6. 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, Authentication authentication) {
        postService.deletePost(id, authentication.getName());
        return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
    }

    // 7. 게시글 좋아요 토글 (추가 및 취소 통합)
    @PostMapping("/{id}/like")
    public ResponseEntity<Boolean> toggleLike(
            @PathVariable Long id,
            Authentication authentication // 다른 메서드와 동일하게 시큐리티 인증 객체 사용
    ) {
        // authentication.getName() 은 로그인한 유저의 이메일을 반환합니다.
        boolean isNowLiked = postService.toggleLike(id, authentication.getName());

        // 프론트엔드로 true(좋아요 됨) 또는 false(취소 됨) 전달
        return ResponseEntity.ok(isNowLiked);
    }
}