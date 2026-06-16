package com.team2.faultFind_backend.comment;

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
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long id) {
        List<Comment> comments = commentService.getComments(id);
        return ResponseEntity.ok(comments);
    }

    // 댓글 작성 (POST /api/community/{id}/comments)
    @PostMapping("/{id}/comments")
    public ResponseEntity<String> addComment(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            Authentication authentication) {

        String content = request.get("content");
        commentService.addComment(id, content, authentication.getName());
        return ResponseEntity.ok("댓글이 성공적으로 작성되었습니다.");
    }
}