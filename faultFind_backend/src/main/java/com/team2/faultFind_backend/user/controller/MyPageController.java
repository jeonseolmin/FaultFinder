package com.team2.faultFind_backend.user.controller;

import com.team2.faultFind_backend.comment.dto.CommentResponseDto;
import com.team2.faultFind_backend.comment.entity.Comment;
import com.team2.faultFind_backend.comment.repository.CommentRepository;
import com.team2.faultFind_backend.post.dto.PostRequest;
import com.team2.faultFind_backend.post.dto.PostResponse;
import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.user.dto.MyCommentResponse;
import com.team2.faultFind_backend.user.dto.MyPageResponseDto;
import com.team2.faultFind_backend.user.dto.UserResponse;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import com.team2.faultFind_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;

    @GetMapping("/info")
    public ResponseEntity<MyPageResponseDto> getMyPageData(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int postPage,
            @RequestParam(defaultValue = "5") int postSize,
            @RequestParam(defaultValue = "0") int commentPage,
            @RequestParam(defaultValue = "5") int commentSize
    ) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        Pageable postPageable = PageRequest.of(postPage, postSize);
        Pageable commentPageable = PageRequest.of(commentPage, commentSize);

        Page<PostResponse> myPosts = postRepository
                .findByAuthorEmailOrderByIdDesc(user.getEmail(), postPageable)
                .map(PostResponse::from);

        Page<MyCommentResponse> myComments = commentRepository
                .findByAuthorEmailOrderByIdDesc(user.getEmail(), commentPageable)
                .map(MyCommentResponse::from);

        MyPageResponseDto response = MyPageResponseDto.builder()
                .user(UserResponse.from(user))
                .posts(myPosts)
                .comments(myComments)
                .build();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/withdraw")
    public ResponseEntity<String> withdrawSelf(Authentication authentication) {
        // JWT 토큰 필터를 거쳐서 들어온 현재 로그인 유저의 이메일
        String email = authentication.getName();

        userService.withdrawSelf(email);
        return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
    }
}
