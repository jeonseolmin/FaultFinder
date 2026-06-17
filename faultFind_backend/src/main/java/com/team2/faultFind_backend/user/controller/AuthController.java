package com.team2.faultFind_backend.user.controller;

import com.team2.faultFind_backend.common.security.dto.LoginRequest;
import com.team2.faultFind_backend.user.dto.UserRequest; // 🌟 UserRequest 임포트 확인
import com.team2.faultFind_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // 회원가입 API
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserRequest request) {
        try {
            userService.signUp(request);
            return ResponseEntity.ok("회원가입 성공");
        } catch (IllegalArgumentException e) {
            // UserService에서 이메일 중복 시 던진 에러 메시지를 프론트로 반환 (HTTP 400)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 기존 로그인 API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        String token = userService.login(request);
        System.out.println("token = " + token);
        if(token == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("로그인 실패");
        }
        return ResponseEntity.ok(token);
    }
}