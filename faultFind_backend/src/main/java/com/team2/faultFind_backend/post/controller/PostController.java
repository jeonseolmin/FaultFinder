package com.team2.faultFind_backend.post.controller;

import com.team2.faultFind_backend.post.dto.PostDto;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.service.PostService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<String> writePost(@RequestBody PostDto postDto
            , Authentication authentication) {

        String loggedInUser = authentication.getName();
        postService.createPost(postDto, loggedInUser);

        return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
    }

    @GetMapping
    public ResponseEntity<List<Post>> getPostList() {
        // 리액트가 "/list" 주소로 요청하면, 모든 글 목록을 던져줍니다.
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 글 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody PostDto postDto, Authentication authentication) {
        postService.updatePost(id, postDto, authentication.getName());
        return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
    }

    // 글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, Authentication authentication) {
        postService.deletePost(id, authentication.getName());
        return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
    }

    // 상세 보기
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPost(id));
    }
    
    // 좋아요
    @PostMapping("/{id}/like")
    public ResponseEntity<String> likePost(@PathVariable Long id, Authentication authentication) {
        // 이미 SecurityUrls에 POST /api/community/** 는 로그인(USER_URLS)해야 가능하도록 세팅해 두셨죠!
        postService.likePost(id, authentication.getName());
        return ResponseEntity.ok("좋아요가 반영되었습니다.");
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Post>> getPopularPosts() {
        return ResponseEntity.ok(postService.getPopularPosts());
    }
}
