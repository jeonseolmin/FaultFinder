package com.team2.faultFind_backend.user.controller;

import com.team2.faultFind_backend.common.security.dto.LoginRequest;
import com.team2.faultFind_backend.user.dto.JoinRequest;
import com.team2.faultFind_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/faultfinder")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinRequest request){
        userService.signUp(request);
        return ResponseEntity.ok("회원가입 성공");
    }

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

    //test 용
    @GetMapping("/mypage")
    public ResponseEntity<String> mypage() {
        return ResponseEntity.ok("JWT 인증 성공");
    }

    //test용
    @GetMapping("/test")
    public String test() {
        return "success";
    }
}
