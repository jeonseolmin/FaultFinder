package com.team2.faultFind_backend.admin;

import com.team2.faultFind_backend.post.entity.Post;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}