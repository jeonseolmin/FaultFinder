package com.team2.faultFind_backend.user.controller;

import com.team2.faultFind_backend.user.dto.PasswordChangeDto;
import com.team2.faultFind_backend.user.dto.UserRequest;
import com.team2.faultFind_backend.user.dto.UserResponse;
import com.team2.faultFind_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    /*
     * POST Mapping 칸
     */
    //회원가입
    @PostMapping
    public ResponseEntity<String> signup(@RequestBody UserRequest request) {
        userService.signUp(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    /*
     * GET Mapping 칸
     */

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMyInfo(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getMyInfo(email));
    }

    //test 용
    @GetMapping("/mypage")
    public ResponseEntity<String> myPage() {
        return ResponseEntity.ok("JWT 인증 성공");
    }

    //test용
    @GetMapping("/test")
    public String test() {
        return "success";
    }

    @PutMapping("/password")
    public ResponseEntity<String> changePassword(
            @RequestBody PasswordChangeDto dto,
            Authentication authentication
    ) {
        try {
            userService.changePassword(authentication.getName(), dto);
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestBody java.util.Map<String, String> request) {
        try {
            // 리액트에서 보낸 "email"과 "userName"을 꺼냅니다.
            String email = request.get("email");
            String userName = request.get("userName");

            // 서비스 로직 실행 후 임시 비밀번호를 받아옴
            String tempPassword = userService.findPassword(email, userName);

            // 리액트로 임시 비밀번호를 직접 전달!
            return ResponseEntity.ok(tempPassword);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
