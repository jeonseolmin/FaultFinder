package com.team2.faultFind_backend.post.controller;

import com.team2.faultFind_backend.post.dto.PostRequest;
import com.team2.faultFind_backend.post.dto.PostResponse;
import com.team2.faultFind_backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<Page<PostResponse>> getPosts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Sort sort = Sort.by(Sort.Direction.DESC, "notice")
                .and(Sort.by(Sort.Direction.DESC, "id"));

        Pageable pageable = PageRequest.of(page, size, sort);

        if (keyword != null && !keyword.trim().isEmpty()) {
            return ResponseEntity.ok(
                    postService.searchPosts(category, searchType, keyword, pageable)
            );
        }

        if (category != null && !category.trim().isEmpty() && !category.equals("all")) {
            return ResponseEntity.ok(
                    postService.getPostsByCategory(category, pageable)
            );
        }

        return ResponseEntity.ok(postService.getAllPosts(pageable));
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
        System.out.println("isNotice : "+postRequest.isNotice());
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