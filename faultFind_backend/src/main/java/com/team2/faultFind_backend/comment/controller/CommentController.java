package com.team2.faultFind_backend.comment.controller;

import com.team2.faultFind_backend.comment.dto.CommentRequestDto;
import com.team2.faultFind_backend.comment.dto.CommentResponseDto;
import com.team2.faultFind_backend.comment.service.CommentService;
import com.team2.faultFind_backend.comment.entity.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글 목록 조회 (GET /api/community/{id}/comments)
    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable Long id) {
        List<CommentResponseDto> comments = commentService.getComments(id);
        return ResponseEntity.ok(comments);
    }

    // 댓글 작성 (POST /api/community/{id}/comments)
    @PostMapping("/{id}/comments")
    public ResponseEntity<String> addComment(
            @PathVariable Long id,
            @RequestBody CommentRequestDto commentRequestDto,
            Authentication authentication) {

        commentService.addComment(id,commentRequestDto, authentication.getName());
        return ResponseEntity.ok("댓글이 성공적으로 작성되었습니다.");

    }

    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<String> updateComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @RequestBody CommentRequestDto commentRequestDto,
            Authentication authentication){
            commentService.updateComment(postId,commentId,commentRequestDto, authentication.getName());
        return ResponseEntity.ok("댓글이 성공적으로 수정되었습니다.");
    }

}