package com.team2.faultFind_backend.admin;

import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getAdminDashboard(Authentication authentication) {
        // 1. 요청한 사람의 정보를 DB에서 찾습니다.
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        // 2. 관리자 권한인지 확인합니다.
        // User 엔티티의 권한 변수명과 일치해야 합니다. (예: getRole(), "ADMIN")
        if (!"ROLE_ADMIN".equals(String.valueOf(user.getRole()))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("관리자 권한이 없습니다.");
        }

        // 3. 관리자가 맞다면 모든 유저와 모든 게시글을 가져와서 포장합니다.
        List<User> allUsers = userRepository.findAll();
        List<Post> allPosts = postRepository.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("users", allUsers);
        response.put("posts", allPosts);

        return ResponseEntity.ok(response);
    }
    // 1. 유저 강제 탈퇴 API
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("유저가 강제 탈퇴되었습니다.");
    }

    // 2. 유저 활동 정지 / 해제 토글 API
    @PutMapping("/users/{id}/suspend")
    public ResponseEntity<String> suspendUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        user.setSuspended(!user.isSuspended()); // 상태 뒤집기 (정지 <-> 해제)
        userRepository.save(user);

        String message = user.isSuspended() ? "활동이 정지되었습니다." : "정지가 해제되었습니다.";
        return ResponseEntity.ok(message);
    }

    // 3. 게시글 강제 삭제 API
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<String> deletePostByAdmin(@PathVariable Long id) {
        postRepository.deleteById(id);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }
}