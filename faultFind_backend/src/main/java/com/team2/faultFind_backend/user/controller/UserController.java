package com.team2.faultFind_backend.user.controller;

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
    public ResponseEntity<String> signup(@RequestBody UserRequest request){
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
}
