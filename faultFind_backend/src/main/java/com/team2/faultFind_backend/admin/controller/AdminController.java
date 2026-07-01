package com.team2.faultFind_backend.admin.controller;

import com.team2.faultFind_backend.admin.dto.AdminDashboardResponse;
import com.team2.faultFind_backend.admin.service.AdminService;
import com.team2.faultFind_backend.post.dto.PostResponse;
import com.team2.faultFind_backend.post.service.PostService;
import com.team2.faultFind_backend.user.dto.UserResponse;
import com.team2.faultFind_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getAdminDashboard(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int userPage,
            @RequestParam(defaultValue = "10") int userSize,
            @RequestParam(defaultValue = "0") int postPage,
            @RequestParam(defaultValue = "10") int postSize) {

        String email = authentication.getName();
        Pageable userPageable = PageRequest.of(userPage, userSize);
        Pageable postPageable = PageRequest.of(postPage, postSize);

        AdminDashboardResponse response = adminService.getDashboard(
                email,
                userPageable,
                postPageable
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/withdraw/{id}") // 주소를 명확하게 고정
    public ResponseEntity<String> withdrawUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("유저가 임시 탈퇴 처리되었습니다.");
    }

    @PutMapping("/users/{id}/suspend")
    public ResponseEntity<String> suspendUser(@PathVariable Long id) {
        boolean suspended = adminService.toggleSuspend(id);

        String message = suspended ? "활동이 정지되었습니다." : "정지가 해제되었습니다.";
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<String> deletePostByAdmin(@PathVariable Long id) {
        adminService.deletePost(id);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }
}